
def parseInt(string):
    try:
        string_int = int(string)
        return string_int
    except ValueError:
        print('Parse int error:', string)
        return None