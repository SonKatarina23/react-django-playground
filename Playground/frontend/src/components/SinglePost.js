import React, { Component, Fragment } from "react";

export class SinglePost extends Component {
  renderList() {
    console.log(this.props.posts);
    const { photo, captions, owner, liked_by, comments } = this.props.posts;

    return (
      <Fragment>
        <div className="twelve wide column">
          <div className="ui card fluid">
            <div className="content">
              <div className="right floated meta"> ??? hours</div>
              <img
                className="ui avatar image"
                // src={owner.profile_picture}
                // alt={owner.username}
                src=""
                alt="PROFILE PICTURE"
              />
              {/* {owner.username} */}
              USERNAME
            </div>
            <div className="image">
              <img src={photo} className="ui massive image" alt="" />
            </div>
            <div className="content">
              <p>{captions}</p>
              <span className="right floated">
                <i className="heart outline like icon"></i>
                {liked_by.length} likes
              </span>
              <i className="comment icon"></i>
              {comments.length} comments
            </div>
            <div className="extra content">
              <div className="ui large transparent left icon input">
                <i className="heart outline icon"></i>
                <input type="text" placeholder="Add Comment..." />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  render() {
    return <div>{this.renderList()}</div>;
  }
}

export default SinglePost;
