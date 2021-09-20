from flask import Flask 
app = Flask(__name__)


@app.route("/get_df")
def members():
    return {"members": ["Jad", "Rudy", "Fida", "Habib"]};

def get_df():
    script = open(r"E:\Projects\nasa_space_challenge\nasa-space-app-challenge\analysis\trial.py", "r").read()
    exec(script)

if __name__ == "__main__":
    app.run(debug=True);