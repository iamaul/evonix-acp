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

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [news, setNews] = useState({ title: '', content: '', image: '' });

    useEffect(() => {
        if (current_news !== null) {
            const { title, content, image } = current_news;
            setTitle(title);
            setContent(content);
            setImage(image);
            // setNews(current_news);
        } else {
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
            clearNewsErrors();
        }
    }, [newsContext, current_news, clearNewsErrors, error])

    const onEditorChange = (content) => setContent(content);

    const onSubmit = e => {
        e.preventDefault();

        setNews({ title, content, image });
        console.log(news);

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
                    onChange={e => setTitle(e.target.value)}
                    fluid 
                />
                <Form.Field>
                    <Editor
                        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
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
                    onChange={e => setImage(e.target.value)}
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
