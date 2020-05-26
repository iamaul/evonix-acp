import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Editor } from '@tinymce/tinymce-react';
import { Header, Form } from 'semantic-ui-react';

import NewsContext from '../../../context/news/newsContext';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end'
});

const NewsForm = () => {
    const newsContext = useContext(NewsContext);
    const { 
        addNews, 
        updateNews, 
        current_news, 
        clearCurrentNews, 
        clearNewsErrors,
        error
    } = newsContext;

    // const imageFileRef = React.createRef();

    const [news, setNews] = useState({ title: '', content: '', image: '' });

    useEffect(() => {
        if (current_news !== null) {
            setNews(current_news);
        } else {
            setNews({ title: '', content: '', image: '' });
        }

        if (error) {
            error.map(err => {
                return Toast.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.msg
                });
            });
            clearNewsErrors();
        }
    }, [newsContext, current_news, clearNewsErrors, error])

    const { title, content, image } = news;
    const onChange = (e, target) => setNews({ ...news, [target.name]: target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (current_news === null) {
            addNews(news);
        } else {
            updateNews(news);
        }
        clearNews();
    }

    const clearNews = () => {
        clearCurrentNews();
    }
    
    return (
        <>
            <Header as="h3">News Form</Header>
            <Form size="small" onSubmit={onSubmit}>
                <Form.Input 
                    type="text"
                    name="title" 
                    value={title}
                    placeholder="Title"
                    onChange={onChange}
                    fluid 
                />
                <Form.Field>
                    <Editor
                        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                        textareaName="content"
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code wordcount'
                            ],
                            toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview save print | insertfile image media template link anchor codesample | ltr rtl'
                        }}
                        value={content}
                        onChange={onChange}
                    />
                </Form.Field>
                <Form.Input 
                    type="text"
                    name="image" 
                    value={image}
                    placeholder="Image URL (e.g: http://imgur.com/)"
                    onChange={onChange}
                    fluid 
                />
                {/* <Form.Field>
                    <Button 
                        content={current_news ? image : 'Choose image'}
                        labelPosition="left"
                        icon="file image"
                        onClick={() => imageFileRef.current.click()}
                        /><br/>
                    <input
                        ref={imageFileRef}
                        type="file"
                        hidden
                        onChange={onImageChange}
                    />
                </Form.Field> */}
                <Form.Button color="red" size="small" content={current_news ? 'Edit' : 'Add'} />
                {current_news && (
                    <Form.Button color="red" size="small" content="Clear" onClick={clearNews} />
                )}
            </Form>  
        </>
    )
}

export default NewsForm;
