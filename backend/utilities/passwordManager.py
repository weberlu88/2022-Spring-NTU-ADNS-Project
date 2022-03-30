import hashlib, uuid

def generate_salt() -> str:
    return uuid.uuid4().hex

def generate_digest(password: str, salt: str) -> str:
    return hashlib.sha512(str.encode(password + salt)).hexdigest()

def validate_password(inputPass: str, salt: str, digest: str) -> bool:
    inputDgst = generate_digest(inputPass, salt)
    return constant_time_compare(inputDgst, digest)

def constant_time_compare(val1: str, val2: str) -> bool:
    """
    Returns True if the two strings are equal, False otherwise.

    The time taken is independent of the number of characters that match.

    For the sake of simplicity, this function executes in constant time only
    when the two strings have the same length. It short-circuits when they
    have different lengths.
    """
    val1 = str.encode(val1)
    val2 = str.encode(val2)
    if len(val1) != len(val2):
        return False
    result = 0
    for x, y in zip(val1, val2):
        result |= x ^ y
    return result == 0

# res = constant_time_compare('aaaaa', 'aaaa')
# print(res)

salt = generate_salt()
hashed_password = generate_digest('qwert', salt)
print('salt:', salt)
print('hpwd:', hashed_password)