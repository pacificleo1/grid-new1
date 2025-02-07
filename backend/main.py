from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Grid Game Backend is running!"}

# Endpoint to start a new game
@app.post("/start-game/")
def start_game(player_name: str, rows: int, cols: int):
    if not (3 <= rows <= 10 and 3 <= cols <= 10):
        return {"error": "Rows and Columns must be between 3 and 10"}
    
    return {"message": f"Game started for {player_name}", "rows": rows, "cols": cols}

