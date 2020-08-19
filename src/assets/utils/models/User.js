import Model from "./Model"
import FriendRequest from "./FriendRequest"
import axios from 'axios'
import BASE_URL from '../consts'
class User extends Model {
    static app_name = 'user'
    static model_name = 'user'

    // the input argument must be something like:
    // {id: xxx, ....(other data fields)}
    constructor({ id, last_login, is_superuser, date_joined,
                  username, email, date_of_birth, is_authorized,
                  balance, major, grade, bio,avatar, groups,
                  user_permissions, follower_users,totallikes }) {

        super({username, email, grade, bio, major})     // data fields that is requried when save

        // required data fields
        this.app_name = 'user'
        this.model = "user"
        this.pk = id

        // this custom data for user
        this.last_login = last_login
        this.is_superuser = is_superuser
        this.date_joined = date_joined
        this.date_of_birth= date_of_birth
        this.last_login = last_login
        this.is_authorized = is_authorized
        this.balance = balance
        this.major = major
        this.grade = grade
        this.bio = bio
        this.avatar = avatar
        this.groups = groups
        this.totallikes = totallikes
        this.user_permissions = user_permissions
        this.follower_users = follower_users
        this.context = []
        this.newMessageNum = 0
    }

    // custom methods
    static async getSelf() {
        let res = await axios.get(BASE_URL+'user/getself/')
        return new User(res.data)
    }

    // get all the friends of this user
    async getFriends() {
        let res = await axios.get(BASE_URL+`user/getfriends/${this.pk}/`)
        let friends = []
        for (let raw_user of res.data) {
            friends.push(new User(raw_user))
        }
        return friends
    }

    // get all the received friend requests of this user
    async getReceivedFriendRequests() {
        let res = await axios.get(BASE_URL+`user/get_received_requests/${this.pk}/`)
        let requests = []
        for (let request of res.data) {
            requests.push(new FriendRequest(request))
        }
        return requests
    }

    // get all the friend requests of this user
    async getFriendRequests() {
        let res = await axios.get(BASE_URL+`user/getrequests/${this.pk}/`)
        let requests = []
        for (let request of res.data) {
            requests.push(new FriendRequest(request))
        }
        return requests
    }

    static async changepassword(oldpass,newpass) {
        let res = await axios.post(BASE_URL+'user/changepassword/',
         {oldpassword:oldpass, newpassword1:newpass})
        this.context = res.data.data
        return this.context
    }


    static async changeemail(pass,newemail) {
        let res = await axios.post(BASE_URL+'user/changeemail/',
         {password:pass, email1:newemail})
        this.context = res.data.data
        return this.context
    }


    static async gettags() {
        let res = await axios.get(BASE_URL + `user/gettags/`)
        return res.data
    }


    // get model by id
    static async get(id) {
        return await Model._getOne(this.app_name, this.model_name, id, this)
    }


    // get all the model
    static async all() {
        return await Model._raw_all(this.app_name, this.model_name, this)
    }
}

export default User
