
function reducer () {
  switch (action.type) {
case "RESTART_FILTER":
            return {
                ...state,
                filterTeams: []
            }
        default: return state;
}
}

export default reducer;