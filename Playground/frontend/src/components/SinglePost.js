import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

// import static files
import "../css/style.css";

export class SinglePost extends Component {
  renderComment() {
    const { comments } = this.props.posts;
    if (comments.length <= 2) {
      return comments.map(comment => {
        return (
          <div key={comment.id}>
            <div className="description mb-3">
              <strong>{comment.owner.username} </strong>
              {comment.comment}
            </div>
          </div>
        );
      });
    } else {
      let renderedComments = [];
      for (let i = 0; i < 2; i++) {
        renderedComments.push(
          <div className={comments[i].id}>
            <div className="description mb-3">
              <strong>{comments[i].owner.username} </strong>
              {comments[i].comment}
            </div>
          </div>
        );
      }
      return renderedComments;
    }
  }

  renderList() {
    const {
      photo,
      captions,
      owner,
      liked_by,
      comments,
      created_at
    } = this.props.posts;
    return (
      <Fragment>
        <section id="single-post">
          <div className="ui centered card fluid mt-5 mb-0" id="single-post">
            {/* POST HEADING */}
            <div className="item my-3 ml-3">
              <div className="content">
                <div className="right floated">
                  <p className="ui large meta header mr-3 mt-3">
                    <TimeAgo date={created_at} />
                  </p>
                </div>
                <div className="ui image">
                  <Link
                    to={{
                      pathname: `/${owner.username}`,
                      state: {
                        userToLoad: owner
                      }
                    }}
                  >
                    <img
                      className="ui avatar massive image"
                      src={owner.profile_picture}
                      alt={`${owner.first_name} ${owner.last_name}`}
                    />
                    {owner.username}
                  </Link>
                </div>
              </div>
            </div>

            {/* POST IMAGE */}
            <div className="image">
              <img src={photo} className="ui big image" alt="" />
            </div>

            {/* LIKE, COMMENT, AND CAPTIONS */}
            <div className="content">
              <i className="heart outline like big icon mr-3"></i>
              <i className="comment outline like big icon"></i>
            </div>
            <div className="content">
              <p className="ui small header mb-3">{liked_by.length} likes</p>
              <div className="description">
                <strong>{owner.username} </strong>
                {captions}
              </div>
            </div>

            {/* COMMENTS */}
            <div className="extra content">
              {/* COMMENT COUNT */}
              <div className="mb-3">
                <a href="" className="ui tiny">
                  View {comments.length} comments
                </a>
              </div>

              {/* INDIVIDUAL COMMENT */}
              {this.renderComment()}
            </div>

            {/* ADD COMMENT, NEED MORE WORK */}
            <div className="extra content">
              <div className="ui medium form mb-4">
                <div className="ui fluid transparent action input">
                  <input type="text" placeholder="Add Comment..." />
                  <a href="" className="ui tiny ml-3 meta">
                    Post
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="ui huge horizontal divider header"></div>
        </section>
      </Fragment>
    );
  }

  render() {
    return <div>{this.renderList()}</div>;
  }
}

export default SinglePost;
