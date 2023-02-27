import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  IconButton
} from "@material-ui/core";
import Masonry from "react-masonry-css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./image_gap.css";
import Modal from "react-modal";
import { GetApp, HdrStrongRounded } from "@material-ui/icons";

class ImageResults extends Component {
  state = {
    image: null,
    clicked: false
  };

  handleClick = (image) => {
    this.setState({ clicked: true });
    this.setState({ image: image });
    console.log(this.state.image);
  };

  handleCloseModal = () => {
    this.setState({ clicked: true });
    this.setState({ image: null });
  };
  render() {
    // Set breakpoints for the masonry grid
    const breakpointCols = {
      default: 3,
      1100: 1,
      700: 1
    };
    let imageList;
    const { images } = this.props;
    if (images) {
      imageList = (
        <Masonry
          breakpointCols={breakpointCols}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
          height={window.innerHeight}
          width={window.innerWidth}
          style={{ margin: "auto" }}
        >
          {images.map((image) => (
            <div key={image.id}>
              <Card>
                <CardMedia
                  component="img"
                  image={image.urls.regular}
                  className={this.clicked ? "img-modal" : "myImg"}
                  title={image.alt_description}
                  onClick={() => this.handleClick(image)}
                />

                <CardContent>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      alt={image.user.name}
                      src={image.user.profile_image.small}
                    />
                    <div style={{ marginLeft: 10 }}>
                      <Typography variant="subtitle1">
                        {image.user.name}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        @{image.user.username}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "auto"
                      }}
                    >
                      <FavoriteIcon color="secondary" />
                      <Typography variant="body2">{image.likes}</Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </Masonry>
      );
    } else {
      imageList = null;
    }

    return (
      <div style={{ padding: "10px" }}>
        {imageList}

        {this.state.image && (
          <Modal
            isOpen={this.state.clicked}
            onRequestClose={this.handleCloseModal}
            className="img-modal"
          >
            <span className="x-close" onClick={this.handleCloseModal}>
              &times;
            </span>
            <img
              src={this.state.image?.urls.regular}
              alt="img"
              className="modal-content"
            />
            <div id="caption">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  alt={this.state.image.user.name}
                  src={this.state.image.user.profile_image.small}
                />
                <div style={{ marginLeft: 10 }}>
                  <Typography variant="subtitle1">
                    {this.state.image.user.name}
                  </Typography>
                  <Typography variant="subtitle2" color="white">
                    @{this.state.image.user.username}
                  </Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto"
                  }}
                >
                  <FavoriteIcon color="secondary" />
                  <Typography variant="body2">
                    {this.state.image.likes}
                  </Typography>
                  <a
                    href={this.state.image?.urls.regular}
                    download={`${this.state.image.id}.jpg`}
                  >
                    <IconButton style={{ color: "white" }}>
                      <GetApp />
                    </IconButton>
                  </a>
                </div>
                <br />
              </div>

              {this.state.image.description ? (
                <div>
                  <h4 style={{ font: "HdrStrongRounded" }}>Description:</h4>
                  <p>{this.state.image.description}</p>
                </div>
              ) : null}
              <div
                style={{
                  alignItems: "center"
                }}
              >
                <h4>Related Tags</h4>
                {this.state.image.tags.map((tag) => (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{
                      marginLeft: 10,
                      marginRight: 10,
                      marginBottom: 10
                    }}
                    className="tag"
                  >
                    {tag.title}
                  </Typography>
                ))}
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

ImageResults.propTypes = {
  images: PropTypes.array.isRequired
};

export default ImageResults;
