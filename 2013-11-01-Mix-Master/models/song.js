var mongoose = require('mongoose');

var Song = mongoose.Schema({
  title:    {  type:     String,
              required: [true, 'Name is required'],
              match:    [/^[a-zA-Z]+[-a-zA-Z ]*$/, 'Enter a valid song title']
            },
  duration: { type: Number,
              required: [true, 'Song duration is required'],
              min: [1, 'A number greater than zero is required']
            },
  genres:   [ {type: mongoose.Schema.Types.ObjectId, ref: 'Genre'}],
  art:      { type:     String,
              required: [true, 'Image is required'],
              match:    [/^[a-zA-Z0-9]+\.(jpg|png|jpeg)$/, 'Enter a valid image file']
            },
  filename: { type:     String,
              required: [true, 'Filename is required'],
              match:    [/^[a-zA-Z0-9]+\.(mp3|m4a)$/, 'Enter a valid filename']
            },
  lyrics: String,
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Song', Song);