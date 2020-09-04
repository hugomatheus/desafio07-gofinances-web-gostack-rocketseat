import React, { ReactNode } from 'react';

import Dropzone from 'react-dropzone';
import { DropContainer, UploadMessage, UploadMessageFileLarge } from './styles';

interface UploadProps {
  onUpload: Function;
}

const Upload: React.FC<UploadProps> = ({ onUpload }: UploadProps) => {
  function renderDragMessage(
    isDragActive: boolean,
    isDragRejest: boolean,
  ): ReactNode {
    if (!isDragActive) {
      return (
        <UploadMessage>Selecione ou arraste o arquivo aqui.</UploadMessage>
      );
    }

    if (isDragRejest) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }

    return <UploadMessage type="success">Solte o arquivo aqui</UploadMessage>;
  }

  return (
    <>
      <Dropzone
        accept=".csv, application/vnd.ms-excel, text/csv"
        minSize={1}
        maxSize={400}
        onDropAccepted={files => onUpload(files)}
      >
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragReject,
          rejectedFiles,
        }): any => {
          const isFileTooLarge =
            rejectedFiles.length > 0 && rejectedFiles[0].size > 400;

          return (
            <DropContainer
              {...getRootProps()}
              isDragActive={isDragActive}
              isDragReject={isDragReject}
            >
              <input {...getInputProps()} data-testid="upload" />
              {renderDragMessage(isDragActive, isDragReject)}
              {isFileTooLarge && (
                <UploadMessageFileLarge>
                  Arquivo ultrapassa o tamanho máximo.
                </UploadMessageFileLarge>
              )}
            </DropContainer>
          );
        }}
      </Dropzone>
    </>
  );
};

export default Upload;
