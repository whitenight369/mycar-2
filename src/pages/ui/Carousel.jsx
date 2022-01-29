import { Card, Carousel } from 'antd';
const Carousels = () => {
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (
        <section>
            <Card title="轮播图--Carousel" className='card-wrap'>
                <Carousel autoplay>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </Card>
            <Card title="背景轮播图--Carousel" className='card-wrap'>
                <Carousel autoplay>
                <div>
                            <img src='/carousel-img/carousel-1.jpg' />
                        </div>
                        <div>
                            <img src='/carousel-img/carousel-2.jpg' />
                        </div>
                        <div>
                            <img src='/carousel-img/carousel-3.jpg' />
                        </div>
                </Carousel>
            </Card>
        </section>
    )
}
export default Carousels;