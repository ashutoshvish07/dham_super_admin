import { Autocomplete, TextField } from '@mui/material';
import React, { useRef } from 'react'

const AutoComplete = ({
    options,
    label,
    id,
    name,
    value,
    onChange,
    error,
    helperText,
    required = false,
    color = 'primary',
    optionKey = '_id',
    optionLabel = 'name',
    ...rest
}) => {

    const isObjectOptions = options.length > 0 && typeof options[0] === 'object';

    const getOptionLabel = (option) => {
        if (typeof option === 'string') return option;
        return option && option[optionLabel] ? option[optionLabel] : '';
    };

    const isOptionEqualToValue = (option, value) => {
        if (typeof option === 'string') return option === value;
        return option && value && option[optionKey] === value[optionKey];
    };
    return (
        <Autocomplete
            id={id}
            options={options}
            autoHighlight
            value={value}
            onChange={(event, newValue) => onChange(newValue)}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    name={name}
                    color={color}
                    required={required}
                    error={error}
                    helperText={helperText}
                />
            )}
            renderOption={(props, option) => (
                <li {...props} key={isObjectOptions ? option[optionKey] : option}>
                    {getOptionLabel(option)}
                </li>
            )}
            {...rest}
        />
    )
}

export default AutoComplete