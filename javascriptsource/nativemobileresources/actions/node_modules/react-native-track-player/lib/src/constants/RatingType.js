import TrackPlayer from '../TrackPlayerModule';
export var RatingType;
(function (RatingType) {
    RatingType[RatingType["Heart"] = TrackPlayer.RATING_HEART] = "Heart";
    RatingType[RatingType["ThumbsUpDown"] = TrackPlayer.RATING_THUMBS_UP_DOWN] = "ThumbsUpDown";
    RatingType[RatingType["ThreeStars"] = TrackPlayer.RATING_3_STARS] = "ThreeStars";
    RatingType[RatingType["FourStars"] = TrackPlayer.RATING_4_STARS] = "FourStars";
    RatingType[RatingType["FiveStars"] = TrackPlayer.RATING_5_STARS] = "FiveStars";
    RatingType[RatingType["Percentage"] = TrackPlayer.RATING_PERCENTAGE] = "Percentage";
})(RatingType || (RatingType = {}));
