from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__)

# Configure MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'  # your MySQL username
app.config['MYSQL_PASSWORD'] = '8585'  # your MySQL password
app.config['MYSQL_DB'] = 'todo_db'  # your MySQL database name

mysql = MySQL(app)

@app.route('/')
def index():
    # Fetch all tasks from the database
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM tasks")
    tasks = cur.fetchall()
    return render_template('index.html', tasks=tasks)

@app.route('/add', methods=['POST'])
def add_task():
    task_name = request.form.get('task_name')
    if not task_name:
        return jsonify({"error": "Task name is required"}), 400

    try:
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO tasks (task_name) VALUES (%s)", (task_name,))
        mysql.connection.commit()
        task_id = cur.lastrowid
        return jsonify({"task_id": task_id, "task_name": task_name}), 200
    except Exception as e:
        print("Error while adding task:", e)  # Debugging: Log the error
        return jsonify({"error": "An error occurred while adding the task"}), 500


@app.route('/delete/<int:task_id>', methods=['POST'])
def delete_task(task_id):
    # Delete the task from the database
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM tasks WHERE id = %s", (task_id,))
    mysql.connection.commit()

    return jsonify({"status": "success", "task_id": task_id})

if __name__ == '__main__':
    app.run(debug=True)
