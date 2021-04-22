export const get_region = (state) => {
    return state.summary.allData.find(
        (region) => region.region === state.summary.displayed.region
    );
};

export const getDistrict = (state) => {
    const region = get_region(state);
    return (
        region &&
        region.districts.find(
            (dist) => dist.district === state.summary.displayed.district
        )
    );
};

export const getCommunity = (state) => {
    const district = getDistrict(state);

    return (
        district &&
        district.communities.find((com) => {
            return com.community === state.summary.displayed.community;
        })
    );
};

export const getCity = (state) => {
    const community = getCommunity(state);
    return (
        community &&
        community.cities.find(
            (cit) => cit.city === state.summary.displayed.city
        )
    );
};

export const getPossibleDistricts = (state) => {
    const region = get_region(state);
    return region && region.districts.map((n) => n.district);
};
export const getPossibleCommunities = (state) => {
    const district = getDistrict(state);
    return district && district.communities.map((n) => n.community);
};
export const getPossibleCities = (state) => {
    const community = getCommunity(state);
    return community && community.cities.map((n) => n.city);
};
