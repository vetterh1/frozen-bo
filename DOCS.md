<a name="top"></a>
# frozen-bo v0.0.1



- [Auth](#Auth)
	- [Authenticate](#Authenticate)
	- [Authenticate with Facebook](#Authenticate-with-Facebook)
	- [Authenticate with Github](#Authenticate-with-Github)
	- [Authenticate with Google](#Authenticate-with-Google)
	
- [Characteristics](#Characteristics)
	- [Retrieve item characteristics](#Retrieve-item-characteristics)
	
- [Home](#Home)
	- [Create home](#Create-home)
	- [Delete home](#Delete-home)
	- [Retrieve home](#Retrieve-home)
	- [Retrieve home by id2](#Retrieve-home-by-id2)
	- [Retrieve homes](#Retrieve-homes)
	- [Update home](#Update-home)
	
- [Item](#Item)
	- [Create item](#Create-item)
	- [Delete item](#Delete-item)
	- [Remove item](#Remove-item)
	- [Retrieve item](#Retrieve-item)
	- [Retrieve all items including the removed ones](#Retrieve-all-items-including-the-removed-ones)
	- [Duplicate item](#Duplicate-item)
	- [Update item](#Update-item)
	- [Update item&#39;s picture](#Update-item&#39;s-picture)
	- [Retrieve removed items](#Retrieve-removed-items)
	
- [PasswordReset](#PasswordReset)
	- [Send email](#Send-email)
	- [Submit password](#Submit-password)
	- [Verify token](#Verify-token)
	
- [User](#User)
	- [Create user](#Create-user)
	- [Delete user](#Delete-user)
	- [Join user&#39;s home](#Join-user&#39;s-home)
	- [Add new home to user](#Add-new-home-to-user)
	- [Remove user&#39;s home info](#Remove-user&#39;s-home-info)
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
| Authorization | `String` | <p>Basic authorization with email and password.</p>|

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>Master access_token.</p> |


### Success response
#### Success response - `Success 201`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| token | `String` | <p>User <code>access_token</code> to be passed to other requests.</p> |
| user | `Object` | <p>Current user's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 401 |  | <p>Master access only or invalid credentials.</p> |

## <a name='Authenticate-with-Facebook'></a> Authenticate with Facebook
[Back to top](#top)



```
POST /auth/facebook
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>Facebook user accessToken.</p> |


### Success response
#### Success response - `Success 201`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| token | `String` | <p>User <code>access_token</code> to be passed to other requests.</p> |
| user | `Object` | <p>Current user's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 401 |  | <p>Invalid credentials.</p> |

## <a name='Authenticate-with-Github'></a> Authenticate with Github
[Back to top](#top)



```
POST /auth/github
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>Github user accessToken.</p> |


### Success response
#### Success response - `Success 201`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| token | `String` | <p>User <code>access_token</code> to be passed to other requests.</p> |
| user | `Object` | <p>Current user's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 401 |  | <p>Invalid credentials.</p> |

## <a name='Authenticate-with-Google'></a> Authenticate with Google
[Back to top](#top)



```
POST /auth/google
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>Google user accessToken.</p> |


### Success response
#### Success response - `Success 201`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| token | `String` | <p>User <code>access_token</code> to be passed to other requests.</p> |
| user | `Object` | <p>Current user's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 401 |  | <p>Invalid credentials.</p> |

# <a name='Characteristics'></a> Characteristics

## <a name='Retrieve-item-characteristics'></a> Retrieve item characteristics
[Back to top](#top)



```
GET /characteristics
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| itemCharacteristics | `Object[]` | <p>List of item characteristics.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 401 |  | <p>user access only.</p> |

# <a name='Home'></a> Home

## <a name='Create-home'></a> Create home
[Back to top](#top)



```
POST /homes
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>admin access token.</p> |
| name |  | <p>Home's name.</p> |
| label |  | <p>Home's label.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| home | `Object` | <p>Home's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Home not found.</p> |
| 401 |  | <p>admin access only.</p> |

## <a name='Delete-home'></a> Delete home
[Back to top](#top)



```
DELETE /homes/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>admin access token.</p> |


### Success response
#### Success response - `Success 204`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 204 |  | <p>No Content.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 404 |  | <p>Home not found.</p> |
| 401 |  | <p>admin access only.</p> |

## <a name='Retrieve-home'></a> Retrieve home
[Back to top](#top)



```
GET /homes/id2/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| id2 | `String` | <p>Id2 to search.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| home | `Object` | <p>Home's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Home not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Retrieve-home-by-id2'></a> Retrieve home by id2
[Back to top](#top)



```
GET /homes/id2/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| id2 | `String` | <p>Id to search.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| home | `Object` | <p>Home's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Home not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Retrieve-homes'></a> Retrieve homes
[Back to top](#top)



```
GET /homes
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| q | `String` | **optional**<p>Query to search.</p> |
| page | `Number` | **optional**<p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional**<p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional**<p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional**<p>Fields to be returned.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| homes | `Object[]` | <p>List of homes.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Update-home'></a> Update home
[Back to top](#top)



```
PUT /homes/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>admin access token.</p> |
| name |  | <p>Home's name.</p> |
| label |  | <p>Home's label.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| home | `Object` | <p>Home's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Home not found.</p> |
| 401 |  | <p>admin access only.</p> |

# <a name='Item'></a> Item

## <a name='Create-item'></a> Create item
[Back to top](#top)

<p>It means the user should exist and have a valid home</p>

```
POST /items
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| category |  | <p>Item's category.</p> |
| details |  | <p>Item's details.</p> |
| container |  | <p>Item's container.</p> |
| color |  | <p>Item's color.</p> |
| size |  | <p>Item's size.</p> |
| freezer |  | <p>Item's freezer.</p> |
| location |  | <p>Item's location.</p> |
| description |  | <p>Item's description.</p> |
| expirationDate |  | <p>Item's expiration date.</p> |
| expirationInMonth |  | <p>Item's expiration in months.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| item | `Object` | <p>Item's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Item not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Delete-item'></a> Delete item
[Back to top](#top)



```
DELETE /items/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |


### Success response
#### Success response - `Success 204`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 204 |  | <p>No Content.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 404 |  | <p>Item not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Remove-item'></a> Remove item
[Back to top](#top)

<p>otherwise don't mark as removed, but adjust the new size</p>

```
POST /items/remove/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| size |  | <p>Item's new size or nothing (for remove all)</p> |
| access_token | `String` | <p>user access token.</p> |


### Success response
#### Success response - `Success 204`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 204 |  | <p>No Content.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 404 |  | <p>Item not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Retrieve-item'></a> Retrieve item
[Back to top](#top)



```
GET /items/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| item | `Object` | <p>Item's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Item not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Retrieve-all-items-including-the-removed-ones'></a> Retrieve all items including the removed ones
[Back to top](#top)



```
GET /items
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| q | `String` | **optional**<p>Query to search.</p> |
| page | `Number` | **optional**<p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional**<p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional**<p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional**<p>Fields to be returned.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| items | `Object[]` | <p>List of items.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Duplicate-item'></a> Duplicate item
[Back to top](#top)

<p>It's possible to duplicate only one element :)</p>

```
PUT /items/:id/duplicate
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| duplicated | `Object` | <p>item's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Item not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Update-item'></a> Update item
[Back to top](#top)

<p>It's possible to update only one element :)</p>

```
PUT /items/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| category |  | <p>Item's category.</p> |
| details |  | <p>Item's details.</p> |
| container |  | <p>Item's container.</p> |
| color |  | <p>Item's color.</p> |
| size |  | <p>Item's size.</p> |
| freezer |  | <p>Item's freezer.</p> |
| location |  | <p>Item's location.</p> |
| description |  | <p>Item's description.</p> |
| expirationDate |  | <p>Item's expiration date.</p> |
| expirationInMonth |  | <p>Item's expiration in months.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| item | `Object` | <p>Item's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Item not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Update-item&#39;s-picture'></a> Update item&#39;s picture
[Back to top](#top)

<p>(!) the picture &amp; thumbnail names MUST be passed with the pictures (in originalname)</p>

```
PUT /items/picture
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| in |  | <p>multipart {String} id : item id.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| item | `Object` | <p>Item's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Item not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Retrieve-removed-items'></a> Retrieve removed items
[Back to top](#top)

<p>Find all the removed items for the home of the current user</p>

```
GET /removed
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| q | `String` | **optional**<p>Query to search.</p> |
| page | `Number` | **optional**<p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional**<p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional**<p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional**<p>Fields to be returned.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| items | `Object[]` | <p>List of items.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>user access only.</p> |

# <a name='PasswordReset'></a> PasswordReset

## <a name='Send-email'></a> Send email
[Back to top](#top)



```
POST /password-resets
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| email | `String` | <p>Email address to receive the password reset token.</p> |
| link | `String` | <p>Link to redirect user.</p> |


### Success response
#### Success response - `Success 202`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 202 |  | <p>Accepted.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |

## <a name='Submit-password'></a> Submit password
[Back to top](#top)



```
PUT /password-resets/:token
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| password | `String` | <p>User's new password.</p>_Size range: 6.._<br> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| user | `Object` | <p>User's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Token has expired or doesn't exist.</p> |

## <a name='Verify-token'></a> Verify token
[Back to top](#top)



```
GET /password-resets/:token
```



### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| token | `String` | <p>Password reset token.</p> |
| user | `Object` | <p>User's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 404 |  | <p>Token has expired or doesn't exist.</p> |

# <a name='User'></a> User

## <a name='Create-user'></a> Create user
[Back to top](#top)



```
POST /users
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>Master access_token.</p> |
| email | `String` | <p>User's email.</p> |
| password | `String` | <p>User's password.</p>_Size range: 6.._<br> |
| name | `String` | **optional**<p>User's name.</p> |
| language | `String` | **optional**<p>User's language.</p> |
| picture | `String` | **optional**<p>User's picture.</p> |
| role | `String` | **optional**<p>User's role.</p>_Default value: user_<br>_Allowed values: user,admin_ |


### Success response
#### Success response - `Sucess 201`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| user | `Object` | <p>User's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>Master access only.</p> |
| 409 |  | <p>Email already registered.</p> |

## <a name='Delete-user'></a> Delete user
[Back to top](#top)



```
DELETE /users/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>User access_token.</p> |


### Success response
#### Success response - `Success 204`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 204 |  | <p>No Content.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 401 |  | <p>Admin access only.</p> |
| 404 |  | <p>User not found.</p> |

## <a name='Join-user&#39;s-home'></a> Join user&#39;s home
[Back to top](#top)

<p>Join existing home</p>

```
PUT /users/:id/home/join
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| home | `String` | **optional**<p>existing home id2.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| user | `Object` | <p>User's data.</p> |
| home | `Object` | <p>Home's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>Current user or admin access only.</p> |
| 404 |  | <p>User not found.</p> |

## <a name='Add-new-home-to-user'></a> Add new home to user
[Back to top](#top)

<p>Create a new home and assign it to the user</p>

```
PUT /users/:id/home/new
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| name | `String` | **optional**<p>new home name.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| user | `Object` | <p>User's data.</p> |
| home | `Object` | <p>Home's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>Current user or admin access only.</p> |
| 404 |  | <p>User not found.</p> |

## <a name='Remove-user&#39;s-home-info'></a> Remove user&#39;s home info
[Back to top](#top)

<p>Leave home info from user</p>

```
PUT /users/:id/home/leave
```



### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| user | `Object` | <p>User's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>Current user or admin access only.</p> |
| 404 |  | <p>User not found.</p> |

## <a name='Retrieve-current-user'></a> Retrieve current user
[Back to top](#top)



```
GET /users/me
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>User access_token.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| user | `Object` | <p>User's data.</p> |



## <a name='Retrieve-user'></a> Retrieve user
[Back to top](#top)



```
GET /users/:id
```



### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| user | `Object` | <p>User's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 404 |  | <p>User not found.</p> |

## <a name='Retrieve-users'></a> Retrieve users
[Back to top](#top)



```
GET /users
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>User access_token.</p> |
| q | `String` | **optional**<p>Query to search.</p> |
| page | `Number` | **optional**<p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional**<p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional**<p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional**<p>Fields to be returned.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| users | `Object[]` | <p>List of users.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>Admin access only.</p> |

## <a name='Update-password'></a> Update password
[Back to top](#top)



```
PUT /users/:id/password
```
### Headers
| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Basic authorization with email and password.</p>|

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| password | `String` | <p>User's new password.</p>_Size range: 6.._<br> |


### Success response
#### Success response - `Success 201`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| user | `Object` | <p>User's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>Current user access only.</p> |
| 404 |  | <p>User not found.</p> |

## <a name='Update-user'></a> Update user
[Back to top](#top)

<p>Caution, you CANNOT update the EMAIL. But it's possible to update only one element :)</p>

```
PUT /users/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| access_token | `String` | <p>User access_token.</p> |
| name | `String` | **optional**<p>User's name.</p> |
| language | `String` | **optional**<p>User's language.</p> |
| navigationStyle | `String` | **optional**<p>User's navigationStyle preference (0: bottom, 1: top, 2: float). Default is 0</p> |
| detailsHelpCompleted | `String` | **optional**<p>Has user completed the help wizard in Details (default: false)</p> |
| home | `String` | **optional**<p>User's home id .</p> |
| homeOrder | `Number` | **optional**<p>User's home order (1: 1st user in this house, 2:...).</p> |
| picture | `String` | **optional**<p>User's picture.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| user | `Object` | <p>User's data.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>Current user or admin access only.</p> |
| 404 |  | <p>User not found.</p> |

