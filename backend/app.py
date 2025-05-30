from flask import Flask
from config import Config
from database import db
from routes.auth_routes import auth_routes
from routes.job_routes import job_routes
from flask_jwt_extended import JWTManager
from flask_cors import CORS



app=Flask(__name__)
CORS(app)
app.config.from_object(Config)
db.init_app(app)
jwt=JWTManager(app)

with app.app_context():
    db.create_all()

app.register_blueprint(job_routes)
app.register_blueprint(auth_routes)

@app.route("/",methods=["GET"])
def home():
    return "JobManager API is running!"










if __name__=="__main__":
    app.run(debug=True)