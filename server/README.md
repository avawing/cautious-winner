MOD TWO PROJECT:
Note: 
* means route is protected
! means route has stretch middleware
PART ONE - Server & Routes:
REQUIREMENTS:
    - Server
        - Mongo Connected
        - Middleware
        - Routes Connected
    - Routes
        - /auth
        - /blogs

STRETCH GOALS:
    - Server
        - Configured Logger
        - Configured Security
        - Configured CORS
    - Routes
        - /users

PART TWO - Endpoints:
REQUIREMENTS:
    - /auth
        - login
            - CREATE
        - registration
            - CREATE
    - /blogs
        - dynamic username
            - CREATE*!
            - READ*!
        - dynamic id
            - UPDATE*!
            - DELETE*!
        - base
            - READ
                - ONLY display NON private blogs

STRETCH GOALS:
    - /users
        - dynamic id
            - UPDATE*!
            - DELETE*!
    - /login
        - return user AND user's blogs
    - /blogs
        - query string
            - get by blog_title
            - ensure blog is NOT private
            - if blog is private, and user does not own resource - send an error

PART THREE - User & Blog Schema:
REQUIREMENTS:
    - User Schema
        - username: string, required
        - email: string, required
        - birthday: date, required
        - age: number
    -Blog Schema
        - created_by: string, required
        - created_at: date, required
        - blog_title: string, required
        - blog_content: string, required
        - blog_content: string, required
        - private: boolean, required

STRETCH GOALS
    - User Schema
        -username: unique
    - Blog Schema
        - created_at: default -> current date
        - blog_title: unique
        - private: default -> false

PART FOUR - Middleware & Authentication:

REQUIRED:
    - BCrypt: Encrypt Password
    - BCrypt: Protected Login
    - JWT: Send Header Token
    - JWT: Authenticate Header


STRETCH:
    - Middleware
        - Determine if User 'owns' the Resource they are accessing

PART FIVE Documentation & Hosting:
REQUIRED:
    README.md
        - Names of all ENV Variables
        - Instructions on Installing & Running Locally
        - Endpoints, Parameters, Schema
    Hosted On Heroku

STRETCH:
    SWAGGER DOCUMENTATION