// 访问量统计（中英文统一变量）
(function() {
    var key = 'visit_count_all';
    var count = localStorage.getItem(key);
    if (!count) count = 0;
    count = parseInt(count) + 1;
    localStorage.setItem(key, count);
    var visitCountElem = document.getElementById('visit-count');
    if (visitCountElem) {
        visitCountElem.textContent = count;
    }
})();

// 点赞统计（中英文统一变量，支持取消点赞）
(function() {
    var likeKey = 'like_count_all';
    var likeUserKey = likeKey + '_user';
    var likeCount = localStorage.getItem(likeKey);
    if (!likeCount) likeCount = 0;
    likeCount = parseInt(likeCount);

    var likeNumElem = document.getElementById('like-num');
    var likeBtn = document.getElementById('like-btn');
    var likeIcon = document.getElementById('like-icon');
    if (likeNumElem) {
        likeNumElem.textContent = likeCount;
    }

    function setLikedStyle() {
        if (likeBtn) {
            likeBtn.style.opacity = 0.85;
        }
        if (likeIcon) {
            likeIcon.style.color = '#00A1D6'; // B站蓝
        }
        if (likeBtn) {
            likeBtn.title = '取消点赞';
        }
    }
    function setUnlikedStyle() {
        if (likeBtn) {
            likeBtn.style.opacity = 1;
        }
        if (likeIcon) {
            likeIcon.style.color = '#666';
        }
        if (likeBtn) {
            likeBtn.title = '点赞';
        }
    }

    function updateLikeStatus() {
        if (localStorage.getItem(likeUserKey)) {
            setLikedStyle();
        } else {
            setUnlikedStyle();
        }
    }
    updateLikeStatus();

    if (likeBtn) {
        likeBtn.onclick = function() {
            if (!localStorage.getItem(likeUserKey)) {
                likeCount += 1;
                localStorage.setItem(likeKey, likeCount);
                localStorage.setItem(likeUserKey, '1');
                likeNumElem.textContent = likeCount;
                setLikedStyle();
            } else {
                likeCount = Math.max(0, likeCount - 1);
                localStorage.setItem(likeKey, likeCount);
                localStorage.removeItem(likeUserKey);
                likeNumElem.textContent = likeCount;
                setUnlikedStyle();
            }
        };
    }
})();

// 投币统计（中英文统一变量，支持取消投币）
(function() {
    var coinKey = 'coin_count_all';
    var coinUserKey = coinKey + '_user';
    var coinCount = localStorage.getItem(coinKey);
    if (!coinCount) coinCount = 0;
    coinCount = parseInt(coinCount);

    var coinNumElem = document.getElementById('coin-num');
    var coinBtn = document.getElementById('coin-btn');
    var coinIcon = document.getElementById('coin-icon');
    if (coinNumElem) {
        coinNumElem.textContent = coinCount;
    }

    function setCoinedStyle() {
        if (coinBtn) coinBtn.style.opacity = 0.85;
        if (coinIcon) coinIcon.style.color = '#00A1D6'; // B站蓝
        if (coinBtn) coinBtn.title = '取消投币';
    }
    function setUncoinedStyle() {
        if (coinBtn) coinBtn.style.opacity = 1;
        if (coinIcon) coinIcon.style.color = '#666';
        if (coinBtn) coinBtn.title = '投币';
    }
    function updateCoinStatus() {
        if (localStorage.getItem(coinUserKey)) {
            setCoinedStyle();
        } else {
            setUncoinedStyle();
        }
    }
    updateCoinStatus();

    if (coinBtn) {
        coinBtn.onclick = function() {
            if (!localStorage.getItem(coinUserKey)) {
                coinCount += 1;
                localStorage.setItem(coinKey, coinCount);
                localStorage.setItem(coinUserKey, '1');
                coinNumElem.textContent = coinCount;
                setCoinedStyle();
            } else {
                coinCount = Math.max(0, coinCount - 1);
                localStorage.setItem(coinKey, coinCount);
                localStorage.removeItem(coinUserKey);
                coinNumElem.textContent = coinCount;
                setUncoinedStyle();
            }
        };
    }
})();

// 收藏统计（中英文统一变量，支持取消收藏）
(function() {
    var favKey = 'fav_count_all';
    var favUserKey = favKey + '_user';
    var favCount = localStorage.getItem(favKey);
    if (!favCount) favCount = 0;
    favCount = parseInt(favCount);

    var favNumElem = document.getElementById('fav-num');
    var favBtn = document.getElementById('fav-btn');
    var favIcon = document.getElementById('fav-icon');
    if (favNumElem) {
        favNumElem.textContent = favCount;
    }

    function setFavedStyle() {
        if (favBtn) favBtn.style.opacity = 0.85;
        if (favIcon) favIcon.style.color = '#00A1D6'; // B站蓝
        if (favBtn) favBtn.title = '取消收藏';
    }
    function setUnfavedStyle() {
        if (favBtn) favBtn.style.opacity = 1;
        if (favIcon) favIcon.style.color = '#666';
        if (favBtn) favBtn.title = '收藏';
    }
    function updateFavStatus() {
        if (localStorage.getItem(favUserKey)) {
            setFavedStyle();
        } else {
            setUnfavedStyle();
        }
    }
    updateFavStatus();

    if (favBtn) {
        favBtn.onclick = function() {
            if (!localStorage.getItem(favUserKey)) {
                favCount += 1;
                localStorage.setItem(favKey, favCount);
                localStorage.setItem(favUserKey, '1');
                favNumElem.textContent = favCount;
                setFavedStyle();
            } else {
                favCount = Math.max(0, favCount - 1);
                localStorage.setItem(favKey, favCount);
                localStorage.removeItem(favUserKey);
                favNumElem.textContent = favCount;
                setUnfavedStyle();
            }
        };
    }
})();

// 转发统计（统计点击次数，复制当前网址到剪贴板）
(function() {
    var shareKey = 'share_count_all';
    var shareCount = localStorage.getItem(shareKey);
    if (!shareCount) shareCount = 0;
    shareCount = parseInt(shareCount);

    var shareNumElem = document.getElementById('share-num');
    var shareBtn = document.getElementById('share-btn');
    var shareIcon = document.getElementById('share-icon');
    if (shareNumElem) {
        shareNumElem.textContent = shareCount;
    }
    if (shareBtn && shareIcon) {
        shareBtn.onmouseenter = function() {
            shareIcon.style.color = '#00A1D6';
        };
        shareBtn.onmouseleave = function() {
            shareIcon.style.color = '#666';
        };
        shareBtn.onclick = function() {
            var url = window.location.href;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(url).then(function() {
                    shareBtn.title = '已复制链接！';
                });
            } else {
                var tempInput = document.createElement('input');
                tempInput.value = url;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                shareBtn.title = '已复制链接！';
            }
            shareCount += 1;
            localStorage.setItem(shareKey, shareCount);
            if (shareNumElem) {
                shareNumElem.textContent = shareCount;
            }
        };
    }
})();
