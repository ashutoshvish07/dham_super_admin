import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@mui/material';
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ label, value, onChange, placeholder, onKeyPress, ...rest }) => {
    return (
        <TextField
            fullWidth
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            color="secondary"
            onKeyDown={onKeyPress}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <FaSearch />
                    </InputAdornment>
                ),
            }}
            {...rest}
        />
    );
};

SearchBar.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
    label: 'Search',
    placeholder: 'Search...',
};

export default SearchBar;
