import React, { useState } from 'react';
import { Box, Button, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { MdClose } from 'react-icons/md';
import { FaCloudUploadAlt } from 'react-icons/fa';


const ImageUpload = ({ files, setFiles, deleteFile, multiple = true }) => {

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        if (multiple) {
            setFiles([...files, ...Array.from(event.target.files)]);
        } else {
            setFiles(selectedFiles);
        }
    };

    const handleDelete = (fileToDelete) => {
        deleteFile(fileToDelete);
    };

    return (
        <Box>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple={multiple}
                type="file"
                onChange={handleImageChange}
            />
            <label htmlFor="raised-button-file">
                <Button
                    color="secondary"
                    component="span"
                    variant="contained"
                    startIcon={<FaCloudUploadAlt />}
                >
                    Upload Images
                </Button>
            </label>
            <ImageList rowHeight={180} cols={3}>
                {files?.map((file, index) => {

                    const imageUrl = file?.Url ? file?.Url : file && URL.createObjectURL(file)

                    return (
                        <ImageListItem key={index}>
                            <img
                                src={imageUrl}
                                alt={`uploaded ${index}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <ImageListItemBar
                                actionIcon={
                                    <IconButton onClick={() => handleDelete(file)}>
                                        <MdClose style={{ color: 'white' }} />
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                    )
                }

                )}
            </ImageList>
        </Box>
    );
};

export default ImageUpload;