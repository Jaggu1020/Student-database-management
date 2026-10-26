from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # Enables cross-origin requests from your React frontend

# Database Configuration (Update with your local MySQL credentials)
import os

db_config = {
    "host": os.environ.get("DB_HOST", "localhost"),
    "port": int(
        os.environ.get("DB_PORT", 4000)
    ),  # TiDB Cloud uses port 4000
    "user": os.environ.get("DB_USER", "root"),
    "password": os.environ.get("DB_PASSWORD", ""),
    "database": os.environ.get("DB_NAME", "test"),
}

def get_db_connection():
    return mysql.connector.connect(**db_config)


@app.route('/api/students', methods=['GET'])
def get_students():
    """Fetch all students from the MySQL database."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM students")
        students = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(students), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/students', methods=['POST'])
def add_student():
    """Insert a new student record into MySQL."""
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        department = data.get('department')
        gpa = data.get('gpa')

        if not name or not email:
            return jsonify({"error": "Name and email are required fields."}), 400

        conn = get_db_connection()
        cursor = conn.cursor()
        
        query = "INSERT INTO students (name, email, department, gpa) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (name, email, department, gpa))
        
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Student added successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    """Update an existing student record in MySQL."""
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        department = data.get('department')
        gpa = data.get('gpa')

        if not name or not email:
            return jsonify({"error": "Name and email are required fields."}), 400

        conn = get_db_connection()
        cursor = conn.cursor()
        
        query = """
            UPDATE students 
            SET name = %s, email = %s, department = %s, gpa = %s 
            WHERE id = %s
        """
        cursor.execute(query, (name, email, department, gpa, student_id))
        
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Student updated successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    """Delete a student record from MySQL by ID."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("DELETE FROM students WHERE id = %s", (student_id,))
        conn.commit()
        
        cursor.close()
        conn.close()

        return jsonify({"message": f"Student {student_id} deleted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)