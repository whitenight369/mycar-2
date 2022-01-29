import { Card, Row, Col } from 'antd';
const { Meta } = Card;

const imgList = (imgs) => {
    return imgs.map(value => {
        return (
            <Card title="" cover={<img src={'/gallery/' + value} />}>
                <Meta title="故里--Card+Meta" description="√  ×" />
            </Card>
        )
    })
}

const Gallery = () => {
    const imgs = [
        ['1.png', '2.png', '3.png', '4.png', '5.png'],
        ['6.png', '7.png', '8.png', '9.png', '10.png'],
        ['11.png', '12.png', '13.png', '14.png', '15.png'],
        ['16.png', '17.png', '18.png', '19.png', '20.png'],
        ['21.png', '22.png', '23.png', '24.png', '25.png']
    ]
    return (
        <section>
            <Row>
                <Col md={5}>
                    {imgList(imgs[0])}
                </Col>
                <Col md={5}>
                    {imgList(imgs[1])}
                </Col>
                <Col md={5}>
                    {imgList(imgs[2])}
                </Col>
                <Col md={5}>
                    {imgList(imgs[3])}
                </Col>
                <Col md={4}>
                    {imgList(imgs[4])}
                </Col>
            </Row>
        </section>
    )
}
export default Gallery;