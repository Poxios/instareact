import React, {Component} from "react";
import "./Posts.css";
import gql from "graphql-tag";
import Post from "../Post";
//import Notifier from "../Notifier";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
    this.offline = !navigator.onLine;
  }
  componentDidMount() {

    if ('actions' in Notification.prototype) {
      alert('You can enjoy the notification feature');
    } else {
      alert('Sorry notifications are NOT supported on your browser');
    }

    // request permission
    Notification.requestPermission();

    if (this.offline) {
      this.setState({ posts: JSON.parse(localStorage.getItem("posts")) });
    } else {
      // fetch the initial posts
      this.props.apollo_client
        .query({
          query: gql`
            {
              posts(user_id: "a") {
                id
                user {
                  nickname
                  avatar
                }
                image
                caption
              }
            }
          `
        })
        .then(response => {
          this.setState({ posts: response.data.posts });
          localStorage.setItem("posts", JSON.stringify(response.data.posts));
        });
    }
    //  subscribe to posts channel
    this.posts_channel = this.props.pusher.subscribe("posts-channel");

    // listen for a new post
    this.posts_channel.bind(
      "new-post",
      data => {
        this.setState({ posts: this.state.posts.concat(data.post) });

        // check for notifications
        if (Notification.permission === "granted") {
          try {
            // notify user of new post
            let notification = new Notification("인스타 클론", {
              body: `${data.post.user.nickname}로의 새 게시물입니다.`,
              icon: "https://img.stackshare.io/service/115/Pusher_logo.png",
              image: `${data.post.image}`
            });

            // 클릭되면 웹사이트 열기.
            notification.onclick = function(event) {
              window.open("http://localhost:3000", "_blank");
            };
          } catch (e) {
            console.log("Error displaying notification",e);
          }
        }
      },
      this
    );
  }

  render() {
    return (
      <div>
        <div className="Posts">
          {this.state.posts
            .slice(0)
            .reverse()
            .map(post => (
              <Post
                nickname={post.user.nickname}
                avatar={post.user.avatar}
                image={post.image}
                caption={post.caption}
                key={post.id}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Posts;