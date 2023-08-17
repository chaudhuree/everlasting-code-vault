```css
/*suppose we have a blog section with two item.one is image and another is contect form.now to make them divide into two sectiion we used to do this*/
.blog__content{
    display: flex;
    justify-content: center;
    align-items: center;
}
.blog__content-left,.blog__content-right{}

/*but we can do this like this 🔽🔽*/
.blog__content{
    display: flex;
    align-items: center;
    gap: 100px;
}
.blog__content-left,.blog__content-right{
    flex: 1;
}
```