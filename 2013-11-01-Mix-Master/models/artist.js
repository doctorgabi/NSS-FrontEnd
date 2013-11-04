var mongoose = require('mongoose');

var Artist = mongoose.Schema({
  name:       { type:     String,
                required: [true, 'Name is required'],
                match:    [/^[a-zA-Z]+[-a-zA-Z ]*$/, 'Enter a valid name']
              },
  photo:      { type:      String,
                required: [true, 'Photo is required'],
                match:    [/^[a-zA-Z0-9]+\.(jpg|png|jpeg)$/, 'Enter a valid photo file']
              },
  website:    { type:     String,
                required: [true, 'Filename is required'],
                match:    [/^http\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}$/, 'Enter a valid website address']
              },
  bio:        String,
  songs:      [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}],
  createdAt:  {type: Date, default: Date.now}
});

mongoose.model('Artist', Artist);