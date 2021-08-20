#!/usr/bin/env bash

# arguments
since_commit="${1}"
to_commit="${2}"

get_commit_from() {
    # arguments
    since_commit="${1}"
    to_commit="${2}"

    # scripts
    get_commit_from_script_file="./get-commits-from.sh"

    # or
    OUTPUT= $get_commit_from_script_file "$since_commit" "$to_commit"
    echo $OUTPUT
}

get_commit_from "$since_commit" "$to_commit"

exit 1
