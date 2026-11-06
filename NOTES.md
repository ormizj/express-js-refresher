- Exceptions are handled through expressed, and ignored in the routing level, a general middleware will catch the
  exceptions and pass them through the client if needed, making the service exceptions decoupled\
- No model validations, instead of validating through a class validator with zod, skipping it, as its not the most
  relevant for this project
- No authentication, skipping JWT with token saving into the database (would implement by registering a user, and when
  he logs in save the token so the user can login in the future with the same token and authenticate with it), not
  relevant for the project