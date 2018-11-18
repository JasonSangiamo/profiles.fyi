const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for profile
const ProfileSchema = new Schema({
  // associating user and profile
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  // slug for url
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  // status will be selected from a drop down (student, junior dev, etc...)
  status: {
    type: String,
    required: true
  },
  // array of skills for each user
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  githubUsername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      // to date not required because jobmay be ongoing
      to: {
        type: Date,
        required: true
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String,
        required: false
      }
    }
  ],

  educaton: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldOfStudy: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      // to date not required because jobmay be ongoing
      to: {
        type: Date,
        required: true
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String,
        required: false
      }
    }
  ],
  linkedin: {
    type: String
  },
  date: {
    type: Date,
    defualt: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
