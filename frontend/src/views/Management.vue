<template>
    <q-page class="q-pa-md">

        <q-btn class="q-mb-sm" icon="add" label="CREATE TASK" color="primary" @click="handleCreateTaskClick" />
        <q-table title="" :rows="rows" :columns="columns" row-key="id" no-data-label="I didn't find anything for you">

            <template v-slot:header-cell="props">
                <q-th :props="props" style="font-weight: bold;" align="center">
                    {{ props.col.label }}
                </q-th>
            </template>
            <template v-slot:body-cell-status="props">
                <q-td :props="props">
                    <q-badge class="q-pa-sm" style="font-weight: bold;"
                        :color="props.row.status === '1' ? 'green' : 'red'">
                        {{ props.row.status === '1' ? 'Success' : 'Pending' }}
                    </q-badge>

                </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
                <q-td :props="props" class="gap-2">
                    <q-btn color="blue" icon="mode_edit" size="sm" @click="handleEditTask(props.row.id)"
                        class="q-mr-sm" />
                    <q-btn color="red" icon="delete" size="sm" @click="deleteTasks(props.row.id, props.row.title)" />
                </q-td>
            </template>
        </q-table>
    </q-page>



    <!-- create modal -->
    <q-dialog v-model="createTask" persistent>
        <q-card style="min-width: 550px">
            <q-card-section>
                <div class="text-h6">CREAT TASK</div>
                <hr>
            </q-card-section>
            <q-card-section class="q-pt-none">
                <q-input label="TASK NAME" dense v-model="newTask" autofocus />
                <q-input label="Description" dense v-model="description" autofocus autogrow />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" style="font-weight: bold;" v-close-popup />
                <q-btn flat label="Create" style="font-weight: bold;" @click="addTask(newTask, description)"
                    v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>


    <!-- edit modal -->
    <q-dialog v-model="editTask" persistent>
        <q-card style="min-width: 550px">
            <q-card-section>
                <div class="text-h6">EDIT TASK</div>
                <hr>
            </q-card-section>
            <q-card-section class="q-pt-none">
                <q-input label="TASKNAME" dense v-model="editedTask" autofocus />
                <q-input label="DESCRIPTION" dense v-model="editedDescription" autofocus autogrow />
                <q-toggle :false-value="'PENDING'" :label="`${editedStatus}`" :true-value="'SUCCESS'" color="green"
                    v-model="editedStatus" />

            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" style="font-weight: bold;" v-close-popup />
                <q-btn flat label="EDIT" style="font-weight: bold;"
                    @click="updateEdittask(editedTaskId, editedTask, editedDescription, editedStatus)" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>

import { ref } from "vue";
import axios from "../axios.js";
import moment from 'moment';
import { Notify } from 'quasar'
import { useAuth } from '@/stores/auth.js'


const newTask = ref('')
const description = ref('')
const editedTask = ref('')
const editedDescription = ref('')
const editedStatus = ref(false)
const editTask = ref(false)
const editedTaskId = ref('')
const createTask = ref(false)


const columns = ref([
    {
        name: 'title',
        required: true,
        label: 'TASKNAME',
        align: 'left',
        field: 'title',
        format: val => `${val}`,

    },
    {
        name: 'description',
        align: 'center',
        label: 'DESCRIPTION',
        field: 'description',
        style: 'white-space: normal; padding: 10px;',

    },
    {
        name: 'status',
        label: 'STATUS',
        field: 'status',
        align: 'center',
        sortable: true,
    },
    {
        name: 'CREATE',
        label: 'CREATE',
        field: row => moment(row.created_at).format('YYYY-MM-DD HH:mm:ss'), 

        align: 'center',
        sortable: true,
    },
    {
        name: 'updated_at',
        label: 'LATEST UPDATE',
        field: row => moment(row.updated_at).format('YYYY-MM-DD HH:mm:ss'), 
        sortable: true,
        align: 'center',

    },
    {
        name: 'actions',
        label: 'Actions',
        align: 'center',
        field: 'actions', 
        sortable: false,
    }
])

const rows = ref([]);






export default {
    setup() {
        const authStore = useAuth();
        const fetchTasks = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/tasks");
                rows.value = res.data.data.tasks;
            } catch (err) {
                console.error("Error fetching tasks:", err);
            }
        }
        fetchTasks();

        const handleCreateTaskClick = () => {
            if (authStore.isAuthenticated) {
                createTask.value = true; 
            } else {
                Notify.create({
                    color: 'negative',
                    message: 'Please login to create a task!',
                    icon: 'warning',
                    position: 'top',
                });
                router.push('/login'); 
            }
        };
        const deleteTasks = async (id, title) => {
            try {
                if (authStore.isAuthenticated) {
                    await axios.delete(`http://localhost:3000/api/deletetasks/${id}`);
                    Notify.create({ color: 'positive', message: `${title} SUCCESSFULLY DELETED`, icon: 'done', position: 'top' },)
                    fetchTasks();
                } else {
                    Notify.create({
                        color: 'negative',
                        message: 'Please login to create a task!',
                        icon: 'warning',
                        position: 'top',
                    });
                    router.push('/login'); 
                }
            } catch (err) {
                console.error("Error deleting task:", err);
            }
        };
        const addTask = async (title, descriptions) => {
            if (authStore.isAuthenticated) {
                try {
                    await axios.post("http://localhost:3000/api/addtasks", {
                        title,
                        description: descriptions,
                    });

                    Notify.create({ color: 'positive', message: `${title} SUCCESSFULLY CREATED`, icon: 'done', position: 'top' },)
                    fetchTasks();
                    newTask.value = '';
                    description.value = '';

                } catch (err) {
                    Notify.create({
                        color: 'negative',
                        message: err.response.data.message,
                        icon: 'warning',
                        position: 'top',
                    });
                    console.error("Error adding task:", err);
                }
            } else {
                Notify.create({
                    color: 'negative',
                    message: 'Please login to create a task!',
                    icon: 'warning',
                    position: 'top',
                });
                router.push('/login'); 
            }
        }
        const handleEditTask = async (id) => {
            const taskToEdit = rows.value.find(task => task.id === id);

            if (authStore.isAuthenticated) {
                if (taskToEdit) {
                    editedTaskId.value = taskToEdit.id;
                    editedTask.value = taskToEdit.title;
                    editedDescription.value = taskToEdit.description;
                    editedStatus.value = taskToEdit.status === '1' ? 'SUCCESS' : 'PENDING';

                    editTask.value = true;
                }
            } else {
                Notify.create({
                    color: 'negative',
                    message: 'Please login to edit a task!',
                    icon: 'warning',
                    position: 'top',
                });
                router.push('/login');
            }
        }
        const updateEdittask = async (editedTaskId, editedTask, editedDescription, editedStatus) => {
            if (authStore.isAuthenticated) {
                try {
                    await axios.put(`http://localhost:3000/api/edittasks/${editedTaskId}`, {
                        title: editedTask,
                        description: editedDescription,
                        status: editedStatus === 'SUCCESS' ? '1' : '0',
                    });
                    Notify.create({ color: 'positive', message: `${editedTask} SUCCESSFULLY UPDATED`, icon: 'done', position: 'top' },)
                    fetchTasks();
                    editTask.value = false;
                } catch (err) {
                    Notify.create({
                        color: 'negative',
                        message: err.response.data.message,
                        icon: 'warning',
                        position: 'top',
                    });
                    router.push('/login');
                }

            } else {
                Notify.create({
                    color: 'negative',
                    message: 'Please login to edit a task!',
                    icon: 'warning',
                    position: 'top',
                });
                router.push('/login');
            }
        }

        return {
            columns,
            rows,
            deleteTasks,
            newTask,
            description,
            addTask,
            handleEditTask,
            editedStatus,
            editedDescription,
            editedTask,
            editTask,
            editedTaskId,
            updateEdittask,
            handleCreateTaskClick,
            createTask


        }
    },

}
</script>

<style scoped></style>