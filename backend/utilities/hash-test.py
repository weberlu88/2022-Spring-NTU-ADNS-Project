import hashlib, uuid
import hashlib, uuid

password = 'aaaaaaaaaa'
# password = str.encode(password)
print(type(password), len(password), password)

salt = uuid.uuid4().hex
print(type(salt), len(salt), salt) # len:32 <str>

hashed_password = hashlib.sha512(str.encode(password + salt)).hexdigest()
print(type(hashed_password), len(hashed_password), hashed_password) # len:128 <str>