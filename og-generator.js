(function() {
    var titleEl = document.getElementById('oggTitle');
    var typeEl = document.getElementById('oggType');
    var descEl = document.getElementById('oggDesc');
    var urlEl = document.getElementById('oggUrl');
    var siteNameEl = document.getElementById('oggSiteName');
    var imageEl = document.getElementById('oggImage');
    var localeEl = document.getElementById('oggLocale');
    var twitterCardEl = document.getElementById('oggTwitterCard');
    var twitterSiteEl = document.getElementById('oggTwitterSite');
    var outputEl = document.getElementById('oggOutput');
    var generateBtn = document.getElementById('oggGenerate');
    var copyBtn = document.getElementById('oggCopy');
    var clearBtn = document.getElementById('oggClear');
    var previewTitle = document.getElementById('oggPreviewTitle');
    var previewDesc = document.getElementById('oggPreviewDesc');
    var previewSite = document.getElementById('oggPreviewSite');
    var previewImage = document.getElementById('oggPreviewImage');

    function escAttr(str) {
        return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function addOgTag(lines, property, content) {
        if (content && content.trim()) {
            lines.push('<meta property="' + property + '" content="' + escAttr(content.trim()) + '">');
        }
    }

    function addTwitterTag(lines, name, content) {
        if (content && content.trim()) {
            lines.push('<meta name="' + name + '" content="' + escAttr(content.trim()) + '">');
        }
    }

    function getVal(el) { return el ? el.value : ''; }

    function generate() {
        var lines = [];
        var title = getVal(titleEl);
        var type = getVal(typeEl);
        var desc = getVal(descEl);
        var url = getVal(urlEl);
        var siteName = getVal(siteNameEl);
        var image = getVal(imageEl);
        var locale = getVal(localeEl);
        var twitterCard = getVal(twitterCardEl);
        var twitterSite = getVal(twitterSiteEl);

        lines.push('<!-- Open Graph Tags -->');
        addOgTag(lines, 'og:title', title);
        addOgTag(lines, 'og:description', desc);
        addOgTag(lines, 'og:type', type);
        addOgTag(lines, 'og:url', url);
        addOgTag(lines, 'og:site_name', siteName);
        addOgTag(lines, 'og:image', image);
        addOgTag(lines, 'og:locale', locale);
        lines.push('');
        lines.push('<!-- Twitter Card Tags -->');
        addTwitterTag(lines, 'twitter:card', twitterCard);
        addTwitterTag(lines, 'twitter:title', title);
        addTwitterTag(lines, 'twitter:description', desc);
        addTwitterTag(lines, 'twitter:image', image);
        addTwitterTag(lines, 'twitter:site', twitterSite);

        if (outputEl) outputEl.value = lines.join('\n');
        updatePreview(title, desc, siteName, image, url);
    }

    function updatePreview(title, desc, siteName, image, url) {
        if (previewTitle) previewTitle.textContent = title || 'Your Page Title';
        if (previewDesc) previewDesc.textContent = desc || '';
        if (previewSite) {
            var domain = siteName || '';
            if (!domain && url) {
                try { domain = new URL(url).hostname; } catch(e) { domain = url; }
            }
            previewSite.textContent = domain.toUpperCase();
        }
        if (previewImage) {
            if (image && image.trim()) {
                previewImage.style.backgroundImage = 'url(' + image.trim() + ')';
                previewImage.textContent = '';
            } else {
                previewImage.style.backgroundImage = '';
                previewImage.textContent = 'No image';
            }
        }
    }

    if (generateBtn) generateBtn.addEventListener('click', generate);

    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            if (!outputEl || !outputEl.value) return;
            navigator.clipboard.writeText(outputEl.value).then(function() {
                var orig = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                setTimeout(function() { copyBtn.textContent = orig; }, 1500);
            });
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            var inputs = [titleEl, descEl, urlEl, siteNameEl, imageEl, localeEl, twitterSiteEl];
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i]) inputs[i].value = '';
            }
            if (typeEl) typeEl.selectedIndex = 0;
            if (twitterCardEl) twitterCardEl.selectedIndex = 0;
            if (outputEl) outputEl.value = '';
            updatePreview('', '', '', '', '');
        });
    }
})();
