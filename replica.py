import os


def main():
    # Home directory
    home_dir = os.path.expanduser('~')

    # MongoReplicaSet directory
    replica_dir = f"{home_dir}\MongoReplicaSet"

    # MongoDB port
    port = 27017

    # Create base directory
    try:
        print("Creating base directory...")
        os.mkdir(replica_dir)

        print("Base directory created.")
    except:
        print("Base directory already exist.")

    # Create replica directories
    for i in range(0, 3):
        try:
            print(f"Creating rs0-{i}...")

            os.mkdir(replica_dir + f"\\rs0-{i}")

            print(f"rs0-{i} created.")
        except:
            print(f"rs0-{i} already exists.")

    # Start each replica.
    for i in range(0, 3):
        try:
            print(f"Starting mongod port {port}...")

            os.system(
                f'start cmd /k mongod --port {port} --replSet rs0 --bind_ip localhost --dbpath "{replica_dir}\\rs0-{i}" --oplogSize 128')

            print(f"mongod port {port} started.")
        except:
            print(f"mongod port {port} was not started.")
            print(f"Check if port {port} is already in use.")
        port = port + 1

    # Connect to one of your mongod instance.
    print("Starting mongosh at port 27017...")

    os.system("start cmd /k mongosh --port 27017")

    print("mongosh started.")

    print(" ")
    print("RUN these commands in the mongosh instance\n")
    print("NOTE: YOU ONLY NEED TO DO THIS ONCE!\n")

    # Initiate replica set.
    print("rs.initiate()\n")

    # Add members to that initiated replica set.
    print('rs.add("localhost:27018"); rs.add("localhost:27019");\n')

    # To prevent closing of the window.
    input("Press enter key to close this.")


main()
