const getSocial = (link) => {
    return link?.includes('insta') ? 'instagram' :
        link?.includes('twitt') ? 'twitter' : null;
};

export default getSocial;