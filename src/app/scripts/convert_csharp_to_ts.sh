#!/bin/bash

# Function to convert C# enums to TypeScript enums
convert_enum() {
    local input_file="$1"
    local output_file="$2"

    # Read through the file line by line
    in_enum=0
    while IFS= read -r line; do
        # Check if it's the start of an enum
        if [[ $line =~ ^[[:space:]]*public[[:space:]]+enum[[:space:]]+([a-zA-Z_][a-zA-Z0-9_]*) ]]; then
            enum_name=${BASH_REMATCH[1]}
            echo "export enum $enum_name {" >> "$output_file"
            in_enum=1
        # If it's the end of the enum
        elif [[ $line =~ ^[[:space:]]*\}[[:space:]]*$ ]]; then
            if [[ $in_enum -eq 1 ]]; then
                echo "}" >> "$output_file"
                in_enum=0
            fi
        # If inside an enum, process its members
        elif [[ $in_enum -eq 1 ]]; then
            enum_member=$(echo "$line" | sed -E 's/^[[:space:]]*([a-zA-Z_][a-zA-Z0-9_]*).*/\1/')
            if [[ ! -z $enum_member ]]; then
                echo "    $enum_member," >> "$output_file"
            fi
        fi
    done < "$input_file"
}

# Input C# file
input_file="csharp_enums.cs"

# Output TypeScript file
output_file="typescript_enums.ts"

# Clear the output file if it exists
> "$output_file"

# Call the conversion function
convert_enum "$input_file" "$output_file"

echo "Conversion complete! Check the output in $output_file"
