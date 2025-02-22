import csv
from datetime import datetime

def parse_dataflash_log(log_file, threshold):
    with open(log_file, 'r') as file:
        csv_reader = csv.reader(file)
        next(csv_reader)

        for row in csv_reader:
            timestamp = float(row[0])
            vibe_x = float(row[1])
            vibe_y = float(row[2])
            vibe_z = float(row[3])

            if max(vibe_x, vibe_y, vibe_z) > threshold:
                formatted_timestamp = datetime.utcfromtimestamp(timestamp).strftime('%H:%M:%S.%f')[:-3]
                print(f"{formatted_timestamp},{vibe_x},{vibe_y},{vibe_z}")

if __name__ == "__main__":
    log_file_path = "path/to/your/logfile.csv"
    vibration_threshold = 35.0  # m/s/s

    print("timestamp,vibe_x,vibe_y,vibe_z")
    parse_dataflash_log(log_file_path, vibration_threshold)
