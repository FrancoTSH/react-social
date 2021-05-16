const ImagePreview = ({ className, image, setFieldValue, file }) => {

  const previewImage = (image) => {
    return URL.createObjectURL(image)
  }

  const deleteImage = () => {
    setFieldValue('image', null);
    file.value = null;
  }

  return (
    <div className={className}>
      <div className="image">
        <img src={previewImage(image)} alt="post-preview" />
      </div>
      <div className="button" aria-label="delete-preview" onClick={() => deleteImage()}>
        <svg viewBox="0 0 24 24"><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>
      </div>
    </div>
  )
}

export default ImagePreview
