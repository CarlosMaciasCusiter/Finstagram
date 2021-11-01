export class User {
    
    id: string;
    username: string;
    bio: string;
    imageURL: string;
    password: string;
    
    constructor(id: string, username: string, bio: string, imageURL: string, password:string) {
        this.id = id;
        this.username = username;
        this.bio = bio;
        this.imageURL = imageURL;
        this.password = password;
    };

}