<a name="top"></a>
# frozen-bo v0.0.1



- [Auth](#Auth)
	- [Authenticate](#Authenticate)
	- [Authenticate with Facebook](#Authenticate-with-Facebook)
	- [Authenticate with Github](#Authenticate-with-Github)
	- [Authenticate with Google](#Authenticate-with-Google)
	
- [Characteristics](#Characteristics)
	- [Retrieve item characteristics](#Retrieve-item-characteristics)
	
- [Item](#Item)
	- [Create item](#Create-item)
	- [Delete item](#Delete-item)
	- [Retrieve item](#Retrieve-item)
	- [Retrieve items](#Retrieve-items)
	- [Update item](#Update-item)
	
- [PasswordReset](#PasswordReset)
	- [Send email](#Send-email)
	- [Submit password](#Submit-password)
	- [Verify token](#Verify-token)
	
- [Size](#Size)
	- [Create size](#Create-size)
	- [Delete size](#Delete-size)
	- [Init sizes with default list](#Init-sizes-with-default-list)
	- [Retrieve size](#Retrieve-size)
	- [Retrieve sizes](#Retrieve-sizes)
	- [Update size](#Update-size)
	
- [Test2](#Test2)
	- [Create test 2](#Create-test-2)
	- [Delete test 2](#Delete-test-2)
	- [Retrieve test 2](#Retrieve-test-2)
	- [Retrieve test 2 s](#Retrieve-test-2-s)
	- [Update test 2](#Update-test-2)
	
- [User](#User)
	- [Create user](#Create-user)
	- [Delete user](#Delete-user)
	- [Retrieve current user](#Retrieve-current-user)
	- [Retrieve user](#Retrieve-user)
	- [Retrieve users](#Retrieve-users)
	- [Update password](#Update-password)
	- [Update user](#Update-user)
	

# <a name='Auth'></a> Auth

## <a name='Authenticate'></a> Authenticate
[Back to top](#top)



```
POST /auth
```
### Headers
| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | String | <p>Basic authorization with email and password.</p>|

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>Master access_token.</p> |


### Success 201
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| token | `String` | <p>User <code>access_token</code> to be passed to other requests.</p> |
| user | `Object` | <p>Current user's data.</p> |
## <a name='Authenticate-with-Facebook'></a> Authenticate with Facebook
[Back to top](#top)



```
POST /auth/facebook
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>Facebook user accessToken.</p> |


### Success 201
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| token | `String` | <p>User <code>access_token</code> to be passed to other requests.</p> |
| user | `Object` | <p>Current user's data.</p> |
## <a name='Authenticate-with-Github'></a> Authenticate with Github
[Back to top](#top)



```
POST /auth/github
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>Github user accessToken.</p> |


### Success 201
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| token | `String` | <p>User <code>access_token</code> to be passed to other requests.</p> |
| user | `Object` | <p>Current user's data.</p> |
## <a name='Authenticate-with-Google'></a> Authenticate with Google
[Back to top](#top)



```
POST /auth/google
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>Google user accessToken.</p> |


### Success 201
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| token | `String` | <p>User <code>access_token</code> to be passed to other requests.</p> |
| user | `Object` | <p>Current user's data.</p> |
# <a name='Characteristics'></a> Characteristics

## <a name='Retrieve-item-characteristics'></a> Retrieve item characteristics
[Back to top](#top)



```
GET /characteristics
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| itemCharacteristics | `Object[]` | <p>List of item characteristics.</p> |
# <a name='Item'></a> Item

## <a name='Create-item'></a> Create item
[Back to top](#top)



```
POST /items
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| category | `` | <p>Item's category.</p> |
| details | `` | <p>Item's details.</p> |
| container | `` | <p>Item's container.</p> |
| color | `` | <p>Item's color.</p> |
| size | `` | <p>Item's size.</p> |
| freezer | `` | <p>Item's freezer.</p> |
| location | `` | <p>Item's location.</p> |
| name | `` | <p>Item's name.</p> |
| expiration | `` | <p>Item's expiration.</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| item | `Object` | <p>Item's data.</p> |
## <a name='Delete-item'></a> Delete item
[Back to top](#top)



```
DELETE /items/:id
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |


### Success 204
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 204 | `` | <p>No Content.</p> |
## <a name='Retrieve-item'></a> Retrieve item
[Back to top](#top)



```
GET /items/:id
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| item | `Object` | <p>Item's data.</p> |
## <a name='Retrieve-items'></a> Retrieve items
[Back to top](#top)



```
GET /items
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| q | `String` | **optional**<p>Query to search.</p> |
| page | `Number` | **optional**<p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional**<p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional**<p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional**<p>Fields to be returned.</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| items | `Object[]` | <p>List of items.</p> |
## <a name='Update-item'></a> Update item
[Back to top](#top)



```
PUT /items/:id
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| category | `` | <p>Item's category.</p> |
| details | `` | <p>Item's details.</p> |
| container | `` | <p>Item's container.</p> |
| color | `` | <p>Item's color.</p> |
| size | `` | <p>Item's size.</p> |
| freezer | `` | <p>Item's freezer.</p> |
| location | `` | <p>Item's location.</p> |
| name | `` | <p>Item's name.</p> |
| expiration | `` | <p>Item's expiration.</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| item | `Object` | <p>Item's data.</p> |
# <a name='PasswordReset'></a> PasswordReset

## <a name='Send-email'></a> Send email
[Back to top](#top)



```
POST /password-resets
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| email | `String` | <p>Email address to receive the password reset token.</p> |
| link | `String` | <p>Link to redirect user.</p> |


### Success 202
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 202 | `` | <p>Accepted.</p> |
## <a name='Submit-password'></a> Submit password
[Back to top](#top)



```
PUT /password-resets/:token
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| password | `String` | <p>User's new password.</p>_Size range: 6.._<br> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| user | `Object` | <p>User's data.</p> |
## <a name='Verify-token'></a> Verify token
[Back to top](#top)



```
GET /password-resets/:token
```



### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| token | `String` | <p>Password reset token.</p> |
| user | `Object` | <p>User's data.</p> |
# <a name='Size'></a> Size

## <a name='Create-size'></a> Create size
[Back to top](#top)



```
POST /sizes
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>admin access token.</p> |
| name | `` | <p>Size's name.</p> |
| label | `` | <p>Size's label.</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| size | `Object` | <p>Size's data.</p> |
## <a name='Delete-size'></a> Delete size
[Back to top](#top)



```
DELETE /sizes/:id
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>admin access token.</p> |


### Success 204
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 204 | `` | <p>No Content.</p> |
## <a name='Init-sizes-with-default-list'></a> Init sizes with default list
[Back to top](#top)



```
POST /sizes/initWithDefault
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>admin access token.</p> |


### Success 204
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 204 | `` | <p>No Content.</p> |
## <a name='Retrieve-size'></a> Retrieve size
[Back to top](#top)



```
GET /sizes/:id
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| size | `Object` | <p>Size's data.</p> |
## <a name='Retrieve-sizes'></a> Retrieve sizes
[Back to top](#top)



```
GET /sizes
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| q | `String` | **optional**<p>Query to search.</p> |
| page | `Number` | **optional**<p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional**<p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional**<p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional**<p>Fields to be returned.</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| sizes | `Object[]` | <p>List of sizes.</p> |
## <a name='Update-size'></a> Update size
[Back to top](#top)



```
PUT /sizes/:id
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>admin access token.</p> |
| name | `` | <p>Size's name.</p> |
| label | `` | <p>Size's label.</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| size | `Object` | <p>Size's data.</p> |
# <a name='Test2'></a> Test2

## <a name='Create-test-2'></a> Create test 2
[Back to top](#top)



```
POST /test2
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| name | `` | <p>Test 2's name.</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| test2 | `Object` | <p>Test 2's data.</p> |
## <a name='Delete-test-2'></a> Delete test 2
[Back to top](#top)



```
DELETE /test2/:id
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |


### Success 204
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 204 | `` | <p>No Content.</p> |
## <a name='Retrieve-test-2'></a> Retrieve test 2
[Back to top](#top)



```
GET /test2/:id
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| test2 | `Object` | <p>Test 2's data.</p> |
## <a name='Retrieve-test-2-s'></a> Retrieve test 2 s
[Back to top](#top)



```
GET /test2
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| q | `String` | **optional**<p>Query to search.</p> |
| page | `Number` | **optional**<p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional**<p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional**<p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional**<p>Fields to be returned.</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| test2S | `Object[]` | <p>List of test 2 s.</p> |
## <a name='Update-test-2'></a> Update test 2
[Back to top](#top)



```
PUT /test2/:id
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| name | `` | <p>Test 2's name.</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| test2 | `Object` | <p>Test 2's data.</p> |
# <a name='User'></a> User

## <a name='Create-user'></a> Create user
[Back to top](#top)



```
POST /users
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>Master access_token.</p> |
| email | `String` | <p>User's email.</p> |
| password | `String` | <p>User's password.</p>_Size range: 6.._<br> |
| name | `String` | **optional**<p>User's name.</p> |
| picture | `String` | **optional**<p>User's picture.</p> |
| role | `String` | **optional**<p>User's role.</p>_Default value: user_<br>_Allowed values: user,admin_ |


### Sucess 201
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| user | `Object` | <p>User's data.</p> |
## <a name='Delete-user'></a> Delete user
[Back to top](#top)



```
DELETE /users/:id
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>User access_token.</p> |


### Success 204
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 204 | `` | <p>No Content.</p> |
## <a name='Retrieve-current-user'></a> Retrieve current user
[Back to top](#top)



```
GET /users/me
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>User access_token.</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| user | `Object` | <p>User's data.</p> |
## <a name='Retrieve-user'></a> Retrieve user
[Back to top](#top)



```
GET /users/:id
```



### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| user | `Object` | <p>User's data.</p> |
## <a name='Retrieve-users'></a> Retrieve users
[Back to top](#top)



```
GET /users
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>User access_token.</p> |
| q | `String` | **optional**<p>Query to search.</p> |
| page | `Number` | **optional**<p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional**<p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional**<p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional**<p>Fields to be returned.</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| users | `Object[]` | <p>List of users.</p> |
## <a name='Update-password'></a> Update password
[Back to top](#top)



```
PUT /users/:id/password
```
### Headers
| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | String | <p>Basic authorization with email and password.</p>|

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| password | `String` | <p>User's new password.</p>_Size range: 6.._<br> |


### Success 201
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| user | `Object` | <p>User's data.</p> |
## <a name='Update-user'></a> Update user
[Back to top](#top)



```
PUT /users/:id
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>User access_token.</p> |
| name | `String` | **optional**<p>User's name.</p> |
| picture | `String` | **optional**<p>User's picture.</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| user | `Object` | <p>User's data.</p> |
