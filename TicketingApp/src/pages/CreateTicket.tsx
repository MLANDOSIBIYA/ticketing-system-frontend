import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, ProgressBar } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const CreateTicket: React.FC = () => {
  const { user, token, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'medium',
    module: '',
    category: ''
  });
  
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const categories = [
    {
      id: 1,
      title: 'Find Support',
      description: 'Get help on how to use a feature',
      icon: '❓',
      value: 'support'
    },
    {
      id: 2,
      title: 'Report an Error',
      description: 'There is an issue and the system is not working',
      icon: '⚠️',
      value: 'error'
    },
    {
      id: 3,
      title: 'Make a Suggestion',
      description: 'Share your ideas and suggestions',
      icon: '💡',
      value: 'suggestion'
    }
  ];

  const modules = [
    { value: '', label: 'Select a feature or module...' },
    { value: 'course-library', label: 'Course Library' },
    { value: 'employment-equity', label: 'Employment Equity' },
    { value: 'teams', label: 'Teams' },
    { value: 'billing', label: 'Billing' },
    { value: 'account', label: 'Account Settings' },
    { value: 'other', label: 'Other' }
  ];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setFormData(prev => ({ ...prev, category }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      // Validate file sizes
      const validFiles = filesArray.filter(file => {
        if (file.size > 10 * 1024 * 1024) {
          setError(`File ${file.name} is too large (max 10MB)`);
          return false;
        }
        return true;
      });
      
      setSelectedFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);
    setUploadProgress(0);

    if (!formData.subject.trim() || !formData.description.trim()) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    if (!selectedCategory) {
      setError('Please select a ticket category');
      setIsSubmitting(false);
      return;
    }

    if (!isAuthenticated || !token) {
      setError('You must be logged in to create a ticket');
      setIsSubmitting(false);
      navigate('/login');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('Subject', formData.subject);
      formDataToSend.append('Description', formData.description);
      formDataToSend.append('Priority', formData.priority);
      formDataToSend.append('Module', formData.module);
      formDataToSend.append('Category', selectedCategory);
      
      if (selectedFiles.length > 0) {
        formDataToSend.append('File', selectedFiles[0]);
      }

      const response = await axios.post('http://localhost:5266/api/tickets', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        }
      });

      if (response.data) {
        setSuccess(`Ticket #${response.data.ticketNumber} created successfully! Redirecting...`);
        
        setTimeout(() => {
          navigate('/client/home');
        }, 3000);
      }
      
    } catch (err: any) {
      console.error('Error creating ticket:', err);
      
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
        logout();
        navigate('/login');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to create ticket. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-5">
      <div className="mb-4">
        <Link 
          to="/client/home" 
          className="text-decoration-none d-flex align-items-center text-primary"
        >
          <div className="bg-white border rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
            ←
          </div>
          <span className="fw-bold">Back to Dashboard</span>
        </Link>
      </div>

      <Row className="justify-content-center">
        <Col lg={10} xl={8}>
          <Card className="border-0 shadow-lg">
            <div 
              className="w-100" 
              style={{ 
                height: '4px',
                background: 'linear-gradient(90deg, #0066cc 0%, #ff8c00 50%, #00cc88 100%)'
              }}
            />
            
            <Card.Body className="p-4 p-md-5">
              <div className="mb-5">
                <h1 className="display-6 fw-bold text-primary mb-2">
                  Create Support Ticket
                </h1>
                <p className="text-muted fs-5">
                  Please provide detailed information to help us assist you effectively.
                </p>
              </div>

              {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
              {success && <Alert variant="success" className="mb-4">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                {/* Category Selection */}
                <Form.Group className="mb-5">
                  <Form.Label className="fw-bold text-uppercase small text-muted mb-3">
                    What do you need help with?
                  </Form.Label>
                  <Row className="g-3">
                    {categories.map((category) => (
                      <Col md={4} key={category.id}>
                        <Card
                          className={`h-100 cursor-pointer border-2 transition-all ${
                            selectedCategory === category.value 
                              ? 'border-primary bg-primary bg-opacity-5' 
                              : 'border-light-subtle'
                          }`}
                          onClick={() => handleCategorySelect(category.value)}
                          style={{ cursor: 'pointer' }}
                        >
                          <Card.Body className="p-4 text-center">
                            <div 
                              className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                              style={{ 
                                width: '60px', 
                                height: '60px',
                                backgroundColor: selectedCategory === category.value 
                                  ? 'rgba(0, 102, 204, 0.1)' 
                                  : '#f8f9fa',
                                fontSize: '1.8rem'
                              }}
                            >
                              {category.icon}
                            </div>
                            <Card.Title className="fw-bold mb-2">
                              {category.title}
                            </Card.Title>
                            <Card.Text className="text-muted small">
                              {category.description}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Form.Group>

                {/* Priority Selection */}
                <Form.Group className="mb-5">
                  <Form.Label className="fw-bold text-uppercase small text-muted mb-3">
                    Priority Level
                  </Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {['low', 'medium', 'high', 'critical'].map((priority) => (
                      <Button
                        key={priority}
                        type="button"
                        variant={formData.priority === priority ? 
                          (priority === 'low' ? 'secondary' : 
                           priority === 'medium' ? 'primary' :
                           priority === 'high' ? 'warning' : 'danger') : 
                          'outline-secondary'}
                        className="rounded-pill px-4 py-2"
                        onClick={() => setFormData(prev => ({ ...prev, priority }))}
                      >
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </Button>
                    ))}
                  </div>
                </Form.Group>

                {/* Module Selection */}
                <Form.Group className="mb-5">
                  <Form.Label className="fw-bold text-uppercase small text-muted mb-2">
                    Related Feature / Module
                  </Form.Label>
                  <Form.Select
                    name="module"
                    value={formData.module}
                    onChange={handleChange}
                    className="py-3 border-2"
                    required
                  >
                    {modules.map((module) => (
                      <option key={module.value} value={module.value}>
                        {module.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Subject */}
                <Form.Group className="mb-5">
                  <Form.Label className="fw-bold text-uppercase small text-muted mb-2">
                    Subject / Title
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Brief summary of the issue"
                    className="py-3 border-2"
                    required
                  />
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-5">
                  <Form.Label className="fw-bold text-uppercase small text-muted mb-2">
                    Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Please provide detailed information about your request..."
                    rows={6}
                    className="py-3 border-2"
                    required
                  />
                </Form.Group>

                {/* File Upload */}
                <Form.Group className="mb-5">
                  <Form.Label className="fw-bold text-uppercase small text-muted mb-3">
                    Attachments (Optional - Max 10MB)
                  </Form.Label>
                  <div className="border-2 border-dashed rounded-3 p-5 text-center bg-light">
                    <div className="mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#6c757d" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                      </svg>
                    </div>
                    <p className="mb-2">
                      <span className="fw-bold text-primary">Click to upload</span> or drag and drop
                    </p>
                    <p className="small text-muted mb-3">
                      PNG, JPG, GIF, PDF, DOC (MAX. 10MB)
                    </p>
                    
                    <Form.Control
                      type="file"
                      id="file-upload"
                      onChange={handleFileChange}
                      accept=".png,.jpg,.jpeg,.gif,.pdf,.doc,.docx"
                      className="d-none"
                    />
                    
                    <Form.Label 
                      htmlFor="file-upload" 
                      className="btn btn-outline-primary mt-2"
                      style={{ cursor: 'pointer' }}
                    >
                      Choose File
                    </Form.Label>
                    
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="mt-3">
                        <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
                      </div>
                    )}
                  </div>
                  
                  {selectedFiles.length > 0 && (
                    <div className="mt-3">
                      <h6 className="mb-2">Selected File:</h6>
                      <ul className="list-group">
                        {selectedFiles.map((file, index) => (
                          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <span className="text-truncate" style={{ maxWidth: '300px' }}>
                              {file.name} ({(file.size / 1024).toFixed(2)} KB)
                            </span>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              Remove
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Form.Group>

                {/* Submit Button */}
                <div className="pt-4 border-top">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-100 py-3 fw-bold fs-5"
                    style={{
                      background: 'linear-gradient(135deg, #ffa600 0%, #ff8f00 100%)',
                      border: 'none'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating Ticket...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-send me-2" viewBox="0 0 16 16">
                          <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                        </svg>
                        Submit Ticket
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateTicket;