# Task Management System with Vue, Node.js, MySQL, and Docker
This project is a task management system built using Vue.js for the frontend, 
Node.js for the backend, MySQL as the database, and Docker for containerization.

# 🚀 Deployment
1. Create a .env file and set environment variables in the README.md file below.
2. Ensure Docker Desktop is installed and running on your system.
3. Open a terminal in the project root directory and run the following command to build and start the containers: docker-compose up --build

# 🛠 Usage
1. Open your browser and go to: http://localhost:5173/

2. Register a new account by providing: Username, Password, Confirm Password
***Note: Usernames must be unique, You cannot register with a username that already exists.*** 

3. Log in with your credentials to start managing tasks.


# ระบบจัดการงานด้วย Vue, Node.js, MySQL และ Docker
ระบบจัดการงานที่พัฒนาขึ้นโดยใช้ Vue.js สำหรับส่วนหน้า, Node.js สำหรับส่วนหลัง, MySQL เป็นฐานข้อมูล และ Docker สำหรับการจัดการคอนเทนเนอร์

# 🚀 การติดตั้งและใช้งาน
1. สร้าง file .env พร้อมกำหนดค่า environment variable ***ในไฟล README.md ข้างล่าง***
2. ตรวจสอบให้แน่ใจว่า Docker Desktop ติดตั้งและทำงานอยู่ในระบบของคุณ
3. เปิดเทอร์มินัลในโฟลเดอร์ root แล้วรันคำสั่งนี้เพื่อสร้างและเริ่มคอนเทนเนอร์: docker-compose up --build

# 🛠 วิธีการใช้งาน
1. ปิดเบราว์เซอร์และไปที่: http://localhost:5173/

2. ลงทะเบียนบัญชีใหม่โดยกรอกข้อมูลดังนี้:ชื่อผู้ใช้งาน (Username), รหัสผ่าน (Password), ยืนยันรหัสผ่าน (Confirm Password)
***หมายเหตุ: ชื่อผู้ใช้ต้องไม่ซ้ำกัน และไม่สามารถลงทะเบียนด้วยชื่อผู้ใช้ที่มีอยู่แล้วได้***


3. ล็อกอินด้วยข้อมูลของคุณเพื่อเริ่มจัดการงานได้เลย


# env varivbles
MYSQL_ROOT_PASSWORD=yourpassword  
MYSQL_DATABASE=tasks_management  
MSQL_USER=root  
PORT=3000  
FRONTEND="http://localhost:5173"  
JWT_SECRET=secret  










