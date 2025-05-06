from flask import Flask, jsonify, request
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

try:
    conn = psycopg2.connect(
        host='db-yigitali.clyucs4e44b4.ap-northeast-2.rds.amazonaws.com',
        user='postgres',
        password='postgres',
        dbname='postgres'
    )
except Exception as e:
    print("Database connection failed:", e)
    exit(1)

@app.route('/cars', methods=['GET'])
def get_students():
    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM tbl_yigitali_cars_data")
        rows = cursor.fetchall()
        result = [dict(zip([col[0] for col in cursor.description], row)) for row in rows]
    return jsonify(result)

@app.route('/cars', methods=['POST'])
def add_car():
    try:
        data = request.get_json()

        # Required fields
        brand = data['brand']
        color = data['color']
        condition = data['condition']
        country = data['country']
        mileage = data['mileage']
        model = data['model']
        price = data['price']
        state = data['state']
        year = data['year']

        # Optional fields (use .get to avoid KeyError)
        lot = data.get('lot')
        vin = data.get('vin')
        title_status = data.get('title_status')

        with conn.cursor() as cursor:
            cursor.execute("""
                INSERT INTO tbl_yigitali_cars_data 
                ("brand", "color", "condition", "country", "lot", "mileage", "model", 
                 "price", "state", "title_status", "vin", "year")
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (brand, color, condition, country, lot, mileage, model,
                  price, state, title_status, vin, year))
            conn.commit()

        return jsonify({"message": "Car added successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/cars/<int:car_id>', methods=['DELETE'])
def delete_car(car_id):
    try:
        with conn.cursor() as cursor:
            cursor.execute('DELETE FROM tbl_yigitali_cars_data WHERE "Column1" = %s', (ca>
            conn.commit()
        return jsonify({"message": "Car deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8800)