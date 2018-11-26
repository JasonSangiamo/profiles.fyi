# profiles.fyi

This project is intended to help streamline the process of creating an online portfolio for students studying computer science. It was created using Node.js, Express, React, and MongoDB.

## Getting Started

If you want to clone this repository. The firs thing you need to do after cloning is install backend and frontend dependencies to do this, run 
~~~
npm install

~~~

from both the project root and from /client.

Second, you need to create a database that the application can connect to. I choose to use mlab which allows for free database storage (see https://mlab.com/). Once the database is created, you must create /config.keys_dev.js and fill out your key information like so:
~~~
module.exports = {
  mongoURI:
    "mongodb://[DBusername]:[password]@[mlab DB url]:35907/[DB name]",
  secretOrKey: "[insert secret key here]"
};
~~~

Once this is done, you should be able to run the project locally using the command
~~~
npm run dev
~~~
which runs both the backend and frontend servers.

## Authors

* **Jason Sangiamo** 


