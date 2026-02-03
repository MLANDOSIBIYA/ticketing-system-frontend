import React from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BrowseCourses: React.FC = () => {
  const courses = [
    {
      id: 1,
      title: 'Employment Equity Fundamentals',
      description: 'Master the basics of EE compliance and reporting',
      duration: '8 hours',
      level: 'Beginner',
      price: 'R1,500',
      category: 'Compliance'
    },
    {
      id: 2,
      title: 'Advanced EE Reporting',
      description: 'Deep dive into complex EE reporting scenarios',
      duration: '12 hours',
      level: 'Advanced',
      price: 'R2,500',
      category: 'Compliance'
    },
    {
      id: 3,
      title: 'Skills Development Planning',
      description: 'Create effective workplace skills plans',
      duration: '10 hours',
      level: 'Intermediate',
      price: 'R1,800',
      category: 'Training'
    },
    {
      id: 4,
      title: 'B-BBEE Management',
      description: 'Strategies for B-BBEE compliance and optimization',
      duration: '15 hours',
      level: 'Advanced',
      price: 'R3,000',
      category: 'Compliance'
    },
    {
      id: 5,
      title: 'Workplace Transformation',
      description: 'Leading organizational change and diversity',
      duration: '14 hours',
      level: 'Intermediate',
      price: 'R2,200',
      category: 'Leadership'
    },
    {
      id: 6,
      title: 'Digital Skills for Business',
      description: 'Essential digital tools for modern workplaces',
      duration: '16 hours',
      level: 'Beginner',
      price: 'R1,900',
      category: 'Technology'
    }
  ];

  const getCategoryColor = (category: string): string => {
    switch (category.toLowerCase()) {
      case 'compliance':
        return 'primary';
      case 'training':
        return 'success';
      case 'leadership':
        return 'warning';
      case 'technology':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <Container className="py-5">
      {/* Back Button */}
      <div className="mb-4">
        <Link 
          to="/client/home" 
          className="text-decoration-none d-flex align-items-center text-primary"
        >
          <div className="bg-white border rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
            ←
          </div>
          <span className="fw-bold">Back to Client Home</span>
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary mb-3">
          Training Courses
        </h1>
        <p className="lead text-muted mb-4">
          Empower your team with future-focused skills and knowledge
        </p>
      </div>

      {/* Courses Grid */}
      <Row className="g-4">
        {courses.map((course) => (
          <Col key={course.id} lg={4} md={6}>
            <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
              <Card.Body className="p-4">
                {/* Category Badge */}
                <div className="mb-3">
                  <span className={`badge bg-${getCategoryColor(course.category)} bg-opacity-10 text-${getCategoryColor(course.category)}`}>
                    {course.category}
                  </span>
                </div>
                
                {/* Course Title */}
                <Card.Title className="fw-bold mb-3">
                  {course.title}
                </Card.Title>
                
                {/* Description */}
                <Card.Text className="text-muted mb-4">
                  {course.description}
                </Card.Text>
                
                {/* Course Details */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Duration:</span>
                    <span className="fw-bold">{course.duration}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Level:</span>
                    <span className="fw-bold">{course.level}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Price:</span>
                    <span className="fw-bold text-primary">{course.price}</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="d-flex gap-2">
                  <Button 
                    variant="outline-primary" 
                    className="flex-grow-1"
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="primary"
                    className="flex-grow-1"
                  >
                    Enroll Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* No Courses Message */}
      {courses.length === 0 && (
        <Alert variant="info" className="text-center">
          <h4 className="alert-heading">No Courses Available</h4>
          <p>New courses are being added soon. Please check back later.</p>
        </Alert>
      )}

      {/* Info Alert */}
      <Alert variant="info" className="mt-5">
        <h5 className="alert-heading">Need Custom Training?</h5>
        <p className="mb-0">
          Contact us for customized training programs tailored to your organization's needs.
        </p>
      </Alert>
    </Container>
  );
};

export default BrowseCourses;