import sys
import subprocess
import json
import shlex

def main():
    if len(sys.argv) < 2:
        print('usage: sherlock_runner.py <username>')
        sys.exit(2)

    username = sys.argv[1]

    # This script expects the 'sherlock' command to be available (install via `pip install sherlock`).
    # We call the sherlock CLI and pipe its stdout back to the caller.
    cmd = f"sherlock {shlex.quote(username)}"
    try:
        proc = subprocess.run(cmd, shell=True, check=True, capture_output=True, text=True)
        # Print raw output (caller will receive it).
        print(proc.stdout)
    except subprocess.CalledProcessError as e:
        print(e.stderr or e.stdout, file=sys.stderr)
        sys.exit(e.returncode)

if __name__ == '__main__':
    main()
