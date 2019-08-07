import { env } from '../../config'


export const success = (res, status) => (entity) => {
  if (entity) {
    res.status(status || 200).json(entity)
  }
  return null
}

export const notFound = (res) => (entity) => {

  // Uses Currying to:
  // - just pass the promise return (above in the promise chain) to the next if it exists
  // - end the chain by returning a 404 error if promise did not return something

  if (entity) {
    return entity
  }
  res.status(404).end()
  return null
}

export const authorOrAdmin = (res, user, userField) => (entity) => {
  try {
    if (entity) {
      const isAdmin = user.role === 'admin'
      const isAuthor = entity[userField] && entity[userField] === user.id
  
      if (isAuthor || isAdmin) {
        return entity
      }
      if (env === 'production' || env === 'development')
        console.error("authorOrAdmin returns 401 - entity=", entity);
      res.status(401).end()
    }
    if (env === 'production' || env === 'development')
      console.error("authorOrAdmin returns null - entity=", entity);
    return null    
  } catch (error) {
    if (env === 'production' || env === 'development')
      console.error("authorOrAdmin exception: ", error);
    return null    
  }

}
