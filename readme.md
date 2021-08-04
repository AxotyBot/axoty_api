# Axotiy API
   
The open API for the axoty discord bot.

## Download

`git clone https://github.com/ThePuddingCODE/axoty_api.git`


## Run

for developers
`yarn run dev`

for production
`node .`

## Get Random

Get Random axolotl resources.

### Endpoints

For Images
http://api.axoty.xyz/random?type=images

For Memes
http://api.axoty.xyz/random?type=memes

For Videos
http://api.axoty.xyz/random?type=videos

For Facts
http://api.axoty.xyz/random?type=facts

For Users
http://api.axoty.xyz/random?type=users

### Response

    {
        string url
        string source
        string suggester
    
    }

## Get-User 

View how much axolotl media diffrent users requested.

### Endpoints

http://api.axoty.xyz/user?id=<id>

### Response

    {
        string: id
        int images
        int fact
        int memes
        int videos
    }