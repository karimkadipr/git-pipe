import subprocess

def execShell(command):
    p = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
    output, *rest = p.communicate()
    return (p, output.decode('utf-8'), *rest)