<script>
    import { base } from "$app/paths";
    function jumpToForm() {
        const atag = document.createElement("a");
        atag.href = `https://www.goldenbridge2002.com/${base}forms/contact-ja`;
        atag.target = "_blank";
        atag.click();
        // goto("/contact");
    }
</script>

<button class="button is-cta" on:click={jumpToForm}>お問い合わせ</button>

<style lang="scss">
    button.is-cta {
        font-weight: bolder;
        background-color: teal;
        color: teal-text;
    }
</style>
