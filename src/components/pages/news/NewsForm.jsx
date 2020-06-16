import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Editor } from '@tinymce/tinymce-react';
import { Header, Form } from 'semantic-ui-react';

import { 
    useNews, 
    addNews, 
    updateNews, 
    clearCurrentNews, 
    clearNewsErrors 
} from '../../../context/news/NewsState';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end'
});

const NewsForm = () => {
    const [newsState, newsDispatch] = useNews();
    const { 
        current_news, 
        error
    } = newsState;

    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        if (current_news !== null) {
            const { id, title, content, image } = current_news;
            setId(id);
            setTitle(title);
            setContent(content);
            setImage(image);
        } else {
            setId('');
            setTitle('');
            setContent('');
            setImage('');
        }

        if (error) {
            error.map(err => {
                return Toast.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.msg
                });
            });
            clearNewsErrors(newsDispatch);
        }
    }, [current_news, clearNewsErrors, error, newsDispatch])

    const onTitleChange = e => setTitle(e.target.value); 
    const onEditorChange = content => setContent(content);
    const onImageChange = e => setImage(e.target.value);

    const onSubmit = e => {
        e.preventDefault();

        const newsAdd = { title, content, image };
        const newsUpdate = { id, title, content, image };

        if (current_news === null) {
            addNews(newsDispatch, newsAdd);
        } else {
            updateNews(newsDispatch, newsUpdate);
        }
        clearNews();
    }

    const clearNews = () => {
        clearCurrentNews(newsDispatch);
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
                    onChange={onTitleChange}
                    fluid 
                />
                <Form.Field>
                    <Editor
                        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                        initialValue={content ? content : null}
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
                        onEditorChange={onEditorChange}
                    />
                </Form.Field>
                <Form.Input 
                    type="text"
                    name="image" 
                    value={image}
                    placeholder="Image URL (e.g: http://imgur.com/)"
                    onChange={onImageChange}
                    fluid 
                />
                <Form.Button color="red" size="small" content={current_news ? 'Edit' : 'Add'} />
                {current_news && (
                    <Form.Button color="red" size="small" content="Clear" onClick={clearNews} />
                )}
            </Form>  
        </>
    )
}

export default NewsForm;
